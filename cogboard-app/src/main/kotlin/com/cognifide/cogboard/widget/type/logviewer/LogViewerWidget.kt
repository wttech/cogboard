package com.cognifide.cogboard.widget.type.logviewer

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import com.cognifide.cogboard.widget.connectionStrategy.UnknownConnectionTypeException
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategy
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategyFactory
import io.vertx.core.Vertx
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.Message
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val address = config.endpointProp(Props.URL)
    private var consumer: MessageConsumer<*>? = null
    private val connectionStrategy: ConnectionStrategy? = determineConnectionStrategy()
    private val logParsingStrategy: LogParserStrategy = determineLogParsingStrategy()

    override fun start(): Widget {
        consumer = connectionStrategy?.getConsumer(eventBusAddress)
        consumer?.handler {
            handleResponse(it)
        }
        return super.start()
    }

    override fun stop(): Widget {
        consumer?.unregister()
        return super.stop()
    }

    override fun updateState() {
        if (address.isNotBlank()) {
            connectionStrategy?.sendRequest(address, config)
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun handleResponse(response: Message<*>) {
        when (val responseBody = response.body()) {
            is JsonObject -> handleHttpResponse(responseBody)
            is Buffer -> connectionStrategy?.handleResponse(responseBody)?.let { send(prepareLogs(it)) }
            is String -> sendConfigurationError(responseBody)
        }
    }

    private fun handleHttpResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            connectionStrategy?.handleResponse(responseBody)?.let { send(prepareLogs(it)) }
        }
    }

    private fun prepareLogs(logs: String): JsonObject {
        var logLines = logs.split("\n")
        logLines = logLines.filter { it.isNotEmpty() }
        return JsonObject().put("logs", logParsingStrategy.parseLines(logLines))
    }

    private fun determineConnectionStrategy(): ConnectionStrategy? =
         try {
            ConnectionStrategyFactory(config, address)
                    .addVertxInstance(vertx)
                    .addEventBusAddress(eventBusAddress)
                    .build()
        } catch (e: RuntimeException) {
            if (e is UnknownConnectionTypeException) {
                sendConfigurationError("Unknown endpoint type")
            }
            null
        }

    private fun determineLogParsingStrategy() =
            LogParserStrategyFactory()
                    .build(LogParserStrategyFactory.MOCK)
}
