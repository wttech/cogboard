package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.ConfigType
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File

class VolumeStorage(
    private val configType: ConfigType,
    private val path: String,
    private val validator: Validator
) : Storage {

    init {
        ConfigFileCreator.createIfDoesNotExist(path)
    }

    override fun loadConfig() = loadConfig(configType, path, validator)

    override fun saveConfig(configJson: JsonObject): Boolean {
        val conf = configJson.toString()
        if (validator.validate(conf)) {
            File(path).writeText(conf)
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
