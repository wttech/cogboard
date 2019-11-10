package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class CredentialsService(private val config: JsonObject, vertx: Vertx) {

    private var storage: Storage = VolumeStorage(ConfigType.CREDENTIALS, vertx)

    fun loadConfig(): JsonObject = storage.loadConfig()
}