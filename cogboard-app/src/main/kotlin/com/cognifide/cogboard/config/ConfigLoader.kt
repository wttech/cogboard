package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.type.ConfigFactory
import io.vertx.core.json.JsonObject
import java.io.File

class ConfigLoader {
    companion object {
        fun loadConfig(configType: ConfigType): JsonObject {
            val config = ConfigFactory.resolveByType(configType)
            val conf = File(config.filePath()).readText()
            val configJson = JsonObject(conf)
            return if (config.validate(configJson)) configJson
            else CogboardConstants.errorResponse("$configType config not valid")
        }
    }
}