package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.EventType
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ConfirmationSender(private val vertx: Vertx) {

    fun sendOk() {
        vertx.eventBus().send(Event.SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(OK_MESSAGE))
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
            .put(Props.EVENT_TYPE, EventType.CONFIG_SAVED)
            .put("message", message)
    }

    companion object {
        private const val OK_MESSAGE = "Configuration saved"
    }
}
