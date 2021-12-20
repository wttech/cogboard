package com.cognifide.cogboard.widget.type.logviewer

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.logStorage.LogStorage
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import com.cognifide.cogboard.widget.connectionStrategy.UnknownConnectionTypeException
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategyFactory
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import main.kotlin.com.cognifide.cogboard.logStorage.LogStorageConfiguration
import main.kotlin.com.cognifide.cogboard.logStorage.QuarantineRule

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val contentRepository: ContentRepository = ContentRepository.DEFAULT
    private val address = config.endpointProp(Props.URL)
    private var consumer: MessageConsumer<JsonObject>? = null
    private val connectionStrategy: ConnectionStrategy? = determineConnectionStrategy()
    private val logStorage: LogStorage? = connectionStrategy?.let {
        LogStorage(
                buildConfiguration(config),
                it,
                determineLogParsingStrategy()
        )
    }

    init {
        // Create a handler for updating the state of the widget.
        createDynamicChangeSubscriber()?.handler { newState ->
            newState?.body()?.let {
                contentRepository.save(id, it)
                logStorage?.rules = rules
                logStorage?.filterExistingLogs()
                updateWidget(false)
            }
        }
    }

    override fun start(): Widget {
        vertx.deployVerticle(logStorage)
        consumer = vertx.eventBus()
            .consumer<JsonObject>(eventBusAddress)
            .handler { logs ->
                logs?.body()?.let { sendResponse(it) }
            }
        return super.start()
    }

    override fun stop(): Widget {
        logStorage?.delete()
        logStorage?.deploymentID()?.let { vertx.undeploy(it) }
        consumer?.unregister()
        return super.stop()
    }

    override fun updateState() {
        updateWidget(true)
    }

    /** Updates the contents of the widget (optionally fetching new logs when [fetchNewLogs] is true). */
    private fun updateWidget(fetchNewLogs: Boolean) {
        if (address.isNotBlank()) {
            logStorage?.rules = rules
            logStorage?.updateLogs(fetchNewLogs)
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    /** Sends the updated state to the client. */
    private fun sendResponse(logs: JsonObject) {
        val rules = contentRepository.get(id).getJsonArray(QUARANTINE_RULES) ?: JsonArray()
        logs.put(QUARANTINE_RULES, rules)
        send(logs)
    }

    /** Gets the quarantine rules from the */
    private val rules: List<QuarantineRule>
    get() = contentRepository
            .get(id)
            .getJsonArray(QUARANTINE_RULES)
            ?.let { QuarantineRule.from(it) } ?: emptyList()

    private fun buildConfiguration(config: JsonObject): LogStorageConfiguration {
        return LogStorageConfiguration(
            config.getString(Props.ID) ?: DEFAULT_ID,
            config.getLong(Props.LOG_LINES) ?: DEFAULT_LOG_LINES,
            config.getLong(Props.LOG_FILE_SIZE) ?: DEFAULT_LOG_FILE_SIZE,
            config.getLong(Props.LOG_EXPIRATION_DAYS) ?: DEFAULT_LOG_EXPIRATION_DAYS,
            eventBusAddress
        )
    }

    private fun determineConnectionStrategy(): ConnectionStrategy? {
        return try {
            ConnectionStrategyFactory(config, address)
                    .build()
        } catch (e: UnknownConnectionTypeException) {
            sendConfigurationError("Unknown endpoint type")
            null
        }
    }

    private fun determineLogParsingStrategy() =
        LogParserStrategyFactory()
            .build(config.getString(Props.LOG_PARSER))

    companion object {
        private const val DEFAULT_ID = "0"
        private const val DEFAULT_LOG_LINES = 1000L
        private const val DEFAULT_LOG_FILE_SIZE = 50L
        private const val DEFAULT_LOG_EXPIRATION_DAYS = 5L

        private const val QUARANTINE_RULES = "quarantineRules"
    }
}
