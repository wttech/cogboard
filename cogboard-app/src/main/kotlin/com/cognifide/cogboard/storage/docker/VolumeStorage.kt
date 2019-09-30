package com.cognifide.cogboard.storage.docker

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.Storage
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File

class VolumeStorage(val vertx: Vertx) : Storage {

    private val loader = Loader()

    override fun loadConfig(): JsonObject {
        return loader.loadConfig()
    }

    override fun saveConfig(config: JsonObject) {
        if (Validation.validate(config)) {
            File("/data/config.json").writeText(config.toString())
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(OK_MESSAGE))
        } else {
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(ERROR_MESSAGE))
            LOGGER.error("$ERROR_MESSAGE \nconfig:\n$config")
        }
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
                .put(CogboardConstants.PROP_EVENT_TYPE, PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE)
                .put("message", message)
    }

    class Loader : Storage {

        override fun loadConfig(): JsonObject {
            val conf = File("/data/config.json").readText()
            val configJson = JsonObject(conf)
            return if (Validation.validate(configJson)) configJson else CogboardConstants.errorResponse("Config not valid")
        }

        override fun saveConfig(config: JsonObject) {
            throw NotImplementedError()
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)
        const val OK_MESSAGE = "Configuration saved"
        const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
        const val PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE = "notification-config-save"
    }
}