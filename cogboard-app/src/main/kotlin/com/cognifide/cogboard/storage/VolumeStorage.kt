package com.cognifide.cogboard.storage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.Config
import com.cognifide.cogboard.config.ConfigFactory
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File

class VolumeStorage(configType: ConfigType, val vertx: Vertx) : Storage {

    private var config: Config = ConfigFactory.getByType(configType)

    override fun loadConfig(): JsonObject = config.load()

    override fun saveConfig(configJson: JsonObject) {
        if (config.validate(configJson)) {
            File(config.filePath()).writeText(configJson.toString())
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(OK_MESSAGE))
        } else {
            vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, JsonObject().message(ERROR_MESSAGE))
            LOGGER.error("$ERROR_MESSAGE \nconfig:\n$configJson")
        }
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
                .put(CogboardConstants.PROP_EVENT_TYPE, PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE)
                .put("message", message)
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)
        const val OK_MESSAGE = "Configuration saved"
        const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
        const val PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE = "notification-config-save"
    }
}