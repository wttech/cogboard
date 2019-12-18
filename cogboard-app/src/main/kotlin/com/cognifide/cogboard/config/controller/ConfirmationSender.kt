package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class ConfirmationSender(private val vertx: Vertx) {

    fun sendOk() {
        vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET,
                JsonObject().message(OK_MESSAGE))
    }

    fun sendError(body: JsonObject) {
        LOGGER.error("$ERROR_MESSAGE \nconfig:\n$body")
        vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET,
                JsonObject().message(ERROR_MESSAGE))
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
                .put(CogboardConstants.PROP_EVENT_TYPE, PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE)
                .put("message", message)
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(ConfirmationSender::class.java)
        private const val OK_MESSAGE = "Configuration saved"
        private const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
        private const val PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE = "notification-config-save"
    }
}
