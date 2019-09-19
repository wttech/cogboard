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
        if (validate(config)) {
            File(BOARD_CONFIG_FILE_PATH).writeText(config.toString())
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(OK_MESSAGE))
        } else {
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(ERROR_MESSAGE))
            LOGGER.error("$ERROR_MESSAGE \nconfig:\n$config")
        }
    }

    override fun loadEndpointsConfig(): JsonObject {
        return loader.loadEndpointsConfig()
    }

    override fun saveEndpointsConfig(config: JsonObject) {
        if (validateEndpoints(config)) {
            File(ENDPOINTS_CONFIG_FILE_PATH).writeText(config.toString())
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
            val conf = File(BOARD_CONFIG_FILE_PATH).readText()
            val configJson = JsonObject(conf)
            return if (validate(configJson)) configJson else CogboardConstants.errorResponse("Config not valid")
        }

        override fun saveConfig(config: JsonObject) {
            throw NotImplementedError()
        }

        override fun loadEndpointsConfig(): JsonObject {
            val conf = File(ENDPOINTS_CONFIG_FILE_PATH).readText().trimIndent()
            val configJson = JsonObject(conf)
            return if (validateEndpoints(configJson)) configJson else CogboardConstants.errorResponse("Endpoints config not valid")
        }

        override fun saveEndpointsConfig(config: JsonObject) {
            throw NotImplementedError()
        }
    }

    companion object {
        const val OK_MESSAGE = "Configuration saved"
        const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
        const val PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE = "notification-config-save"
        private const val BOARD_CONFIG_FILE_PATH = "/data/config.json"
        private const val ENDPOINTS_CONFIG_FILE_PATH = "/data/endpoints.json"
        private val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)

        private fun validate(config: JsonObject): Boolean {
            return config.getJsonObject("boards")?.getJsonObject("boardsById") != null
                    && config.getJsonObject("widgets")?.getJsonObject("widgetsById") != null
        }

        private fun validateEndpoints(config: JsonObject): Boolean {
            return config.getJsonArray("endpoints") != null
        }
    }
}