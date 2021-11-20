package com.cognifide.cogboard.widget.type.logviewer

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.logStorage.MongoLogStorage
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyInt
import com.cognifide.cogboard.widget.connectionStrategy.SSHConnectionStrategyInt
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParser
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategyFactory
import com.cognifide.cogboard.widget.type.logviewer.logparser.MockLogParser
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
    private val connectionStrategyInt: ConnectionStrategyInt = SSHConnectionStrategyInt(config)
    private val logParser: LogParser = MockLogParser()
    private val logStorage = MongoLogStorage(
        buildConfiguration(config),
        connectionStrategyInt,
        logParser
    )

    override fun start(): Widget {
        vertx.deployVerticle(logStorage)
        consumer = vertx.eventBus()
            .consumer<JsonObject>(eventBusAddress)
            .handler { message ->
                println("Sending: ${message.body()}")
                message?.body()?.let { send(it) }
            }
        return super.start()
    }

    override fun stop(): Widget {
        logStorage.deploymentID()?.let { vertx.undeploy(it) }
        consumer?.unregister()
        return super.stop()
    }

    override fun updateState() {
        if (address.isNotBlank()) {
            logStorage.updateLogs()
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun determineConnectionStrategy() =
            ConnectionStrategyFactory(config, address)
                    .addVertxInstance(vertx)
                    .addEventBusAddress(eventBusAddress)
                    .build()

    private fun determineLogParsingStrategy() =
            LogParserStrategyFactory()
                    .build(LogParserStrategyFactory.MOCK)

    private fun buildConfiguration(config: JsonObject): LogStorageConfiguration {
        return LogStorageConfiguration(
            config.getString(Props.ID) ?: "0",
            config.getLong(Props.LOG_LINES) ?: 100,
            config.getLong(Props.LOG_FILE_SIZE) ?: 50,
            config.getLong(Props.LOG_EXPIRATION_DAYS) ?: 5,
            eventBusAddress
        )
    }
}
