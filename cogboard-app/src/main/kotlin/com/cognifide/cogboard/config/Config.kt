package com.cognifide.cogboard.config

import io.vertx.core.json.JsonObject

interface Config {

    fun validate(configJson: JsonObject): Boolean

    fun filePath(): String
}