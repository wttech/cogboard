package com.cognifide.cogboard.storage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.Validator
import io.vertx.core.json.JsonObject
import java.io.File

interface Storage {

    fun loadConfig(type: ConfigType, path: String, validator: Validator): JsonObject {
        val conf = File(path).readText()
        return if (validator.validate(conf)) JsonObject(conf)
        else CogboardConstants.errorResponse("$type config not valid")
    }

    fun loadConfig(): JsonObject
    fun saveConfig(configJson: JsonObject): Boolean
}
