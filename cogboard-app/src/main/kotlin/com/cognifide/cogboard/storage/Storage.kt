package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject

interface Storage {

    fun loadBoardsConfig(): JsonObject

    fun saveBoardsConfig(config: JsonObject)

    fun loadEndpointsConfig(): JsonObject

    fun saveEndpointsConfig(config: JsonObject)
}