package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import io.vertx.core.Vertx
import io.vertx.core.eventbus.Message
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val address = config.getString(Props.LOG_SOURCE)
    private val lines = config.getString(Props.LOG_LINES)
    private val connectionType = config.getString(Props.LOG_SOURCE_TYPE)

    private var consumer: MessageConsumer<*>? = null
    private val connectionStrategy: ConnectionStrategy = determineConnectionStrategy()

    override fun start(): Widget {
        consumer = connectionStrategy.getConsumer(eventBusAddress)
        consumer!!.handler {
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
            connectionStrategy.sendRequest(address, config)
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

    private fun prepareLogs(logs: String): String {
        // TODO
        return logs
    }

    private fun determineConnectionStrategy() =
            ConnectionStrategyFactory(vertx, config)
                .addVertxInstance(vertx)
                .build()
}
