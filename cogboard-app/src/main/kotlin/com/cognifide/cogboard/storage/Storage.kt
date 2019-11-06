package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject

interface Storage {

    fun loadConfig(): JsonObject

    fun saveConfig(configJson: JsonObject)
}