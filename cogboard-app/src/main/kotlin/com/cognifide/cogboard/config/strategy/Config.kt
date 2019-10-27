package com.cognifide.cogboard.config.strategy

import io.vertx.core.json.JsonObject

interface Config {
    fun validate(configJson: JsonObject): Boolean
    fun filePath(): String
}