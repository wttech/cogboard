package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.JsonObject
import java.io.File

abstract class Config {

    fun load(): JsonObject {
        val conf = File(filePath()).readText()
        val configJson = JsonObject(conf)
        return if (validate(configJson)) configJson
        else CogboardConstants.errorResponse("${type()} config not valid")
    }

    abstract fun validate(configJson: JsonObject): Boolean

    abstract fun filePath(): String

    abstract fun type(): ConfigType
}