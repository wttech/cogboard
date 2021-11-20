package com.cognifide.cogboard.widget.type.logviewer

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.logStorage.MongoLogStorage
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyInt
import com.cognifide.cogboard.widget.connectionStrategy.SSHConnectionStrategyInt
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategy
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategyFactory
import com.cognifide.cogboard.widget.type.logviewer.logparser.MockLogParser
import io.vertx.core.Vertx
import io.vertx.core.eventbus.Message
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import main.kotlin.com.cognifide.cogboard.logStorage.LogStorageConfiguration

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val address = config.endpointProp(Props.URL)
    private var consumer: MessageConsumer<*>? = null
    private val connectionStrategy: ConnectionStrategy = determineConnectionStrategy()
    private val connectionStrategyInt: ConnectionStrategyInt = SSHConnectionStrategyInt(config)
    private val logParsingStrategy: LogParserStrategy = determineLogParsingStrategy()
    private val logStorage = MongoLogStorage(
        buildConfiguration(config),
        connectionStrategyInt,
        MockLogParser()
    )

    override fun start(): Widget {
        vertx.deployVerticle(logStorage)
        consumer = connectionStrategy.getConsumer(eventBusAddress)
        consumer!!.handler {
            handleResponse(it)
        }
        vertx.eventBus().consumer<JsonObject>(eventBusAddress + "_alt").handler { message ->
            message?.body()?.let {
                val s = it.toString() + " "
                println("HANDLED $s")
            }
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
            connectionStrategy.sendRequest(address, config)
            logStorage.updateLogs()
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun handleResponse(response: Message<*>) {
        val responseBody = response.body()
        if (responseBody is JsonObject) {
            handleHttpResponse(responseBody)
        } else {
            send(prepareLogs(connectionStrategy.handleResponse(responseBody)))
        }
    }

    private fun handleHttpResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            send(prepareLogs(connectionStrategy.handleResponse(responseBody)))
        }
    }

    private fun prepareLogs(logs: String): JsonObject {
        var logLines = logs.split("\n")
        logLines = logLines.filter { it.isNotEmpty() }
        return JsonObject().put("logs", logParsingStrategy.parseLines(logLines))
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
            config.getInteger(Props.LOG_LINES) ?: 100,
            config.getInteger(Props.LOG_FILE_SIZE) ?: 50,
            config.getInteger(Props.LOG_EXPIRATION_DAYS) ?: 5
        )
    }
}
