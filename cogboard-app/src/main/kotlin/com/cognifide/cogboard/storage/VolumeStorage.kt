package com.cognifide.cogboard.storage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.Config
import com.cognifide.cogboard.config.ConfigFactory
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File

class VolumeStorage(configType: ConfigType) : Storage {

    private var config: Config = ConfigFactory.getByType(configType)

    override fun loadConfig(): JsonObject = config.load()

    override fun saveConfig(configJson: JsonObject): Boolean {
        if (config.validate(configJson)) {
            File(config.filePath()).writeText(configJson.toString())
            return true
        }

        LOGGER.error("$ERROR_MESSAGE \nconfig:\n$configJson")
        return false
    }

    private fun JsonObject.message(message: String): JsonObject {
        return this
                .put(CogboardConstants.PROP_EVENT_TYPE, PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE)
                .put("message", message)
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)
        const val ERROR_MESSAGE = "Configuration not saved - wrong configuration"
        const val PROP_EVENT_TYPE_NOTIFICATION_CONFIG_SAVE = "notification-config-save"
    }
}
