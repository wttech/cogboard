package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.EventType
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class ConfirmationSender(private val vertx: Vertx) {

    fun sendOk() {
        vertx.eventBus().send(Event.SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(OK_MESSAGE))
    }

    fun sendError(body: JsonObject) {
        LOGGER.error("$ERROR_MESSAGE \nconfig:\n$body")
        vertx.eventBus().send(Event.SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(ERROR_MESSAGE))
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
            .put(Props.EVENT_TYPE, EventType.CONFIG_SAVED)
            .put("message", message)
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(ConfirmationSender::class.java)
        private const val OK_MESSAGE = "Configuration saved"
        private const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
    }
}
