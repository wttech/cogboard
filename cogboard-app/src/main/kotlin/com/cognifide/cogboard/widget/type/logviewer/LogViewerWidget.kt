package com.cognifide.cogboard.widget.type.logviewer

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.logStorage.LogStorage
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import com.cognifide.cogboard.widget.connectionStrategy.UnknownConnectionTypeException
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategyFactory
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import main.kotlin.com.cognifide.cogboard.logStorage.LogStorageConfiguration

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
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

    override fun start(): Widget {
        vertx.deployVerticle(logStorage)
        consumer = vertx.eventBus()
            .consumer<JsonObject>(eventBusAddress)
            .handler { message ->
                message?.body()?.let { send(it) }
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
        if (address.isNotBlank()) {
            logStorage?.updateLogs()
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

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
            .build(LogParserStrategyFactory.Type.MOCK)

    companion object {
        private const val DEFAULT_ID = "0"
        private const val DEFAULT_LOG_LINES = 100L
        private const val DEFAULT_LOG_FILE_SIZE = 50L
        private const val DEFAULT_LOG_EXPIRATION_DAYS = 5L
    }
}
