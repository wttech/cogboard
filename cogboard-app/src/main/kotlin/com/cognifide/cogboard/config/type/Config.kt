package com.cognifide.cogboard.config.type

import io.vertx.core.json.JsonObject

interface Config {
    fun validate(configJson: JsonObject): Boolean
    fun filePath(): String
}