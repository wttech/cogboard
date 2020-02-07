package com.cognifide.cogboard.storage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File

class VolumeStorage(
    private val type: ConfigType,
    private val configFile: String = type.configFile()
) : Storage {

    override fun loadConfig(): JsonObject {
            val conf = File(configFile).readText()
            return if (type.validator.validate(conf)) JsonObject(conf)
            else CogboardConstants.errorResponse("$type config not valid")
        }

    override fun saveConfig(configJson: JsonObject): Boolean {
        val conf = configJson.toString()
        if (type.validator.validate(conf)) {
            File(configFile).writeText(conf)
            return true
        }

        LOGGER.error("$ERROR_MESSAGE \nconfig:\n$configJson")
        return false
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)
        const val ERROR_MESSAGE = "Configuration not saved - invalid configuration"
    }
}
