package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject

interface Storage {

    fun loadConfig(): JsonObject

    fun saveConfig(config: JsonObject)

    fun loadEndpointsConfig(): JsonObject

    fun saveEndpointsConfig(config: JsonObject)
}