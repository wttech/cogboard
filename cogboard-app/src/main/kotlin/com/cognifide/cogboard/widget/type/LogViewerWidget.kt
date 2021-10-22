package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyFactory
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val address = config.getString(Props.LOG_SOURCE)
    private val lines = config.getInteger(Props.LOG_LINES)

    private lateinit var consumer: MessageConsumer<JsonObject>
    private var connectionStrategy: ConnectionStrategy = determineConnectionStrategy(config)

    override fun start(): Widget {
        consumer = vertx.eventBus()
                .consumer<JsonObject>(eventBusAddress)
                .handler {
                    handleResponse(it.body())
                }
        return super.start()
    }

    override fun updateState() {
        if (address.isNotBlank()) {
            connectionStrategy.connectAndGetResources(address, config)
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val logs = responseBody.getString(Props.LOG_LINES)

            send(prepareLogs(logs))
        }
    }

    private fun prepareLogs(logs: String): String {
        // TODO
        return logs
    }

    private fun determineConnectionStrategy(config: JsonObject): ConnectionStrategy {
        val type = config.getString(Props.LOG_SOURCE_TYPE)

        return ConnectionStrategyFactory()
                .addVertxInstance(vertx)
                .build(type)
    }
}
