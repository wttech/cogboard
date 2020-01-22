package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.info
import io.vertx.core.json.JsonObject

class AppInfoService(
    private val storage: Storage = info()
) {
    fun loadAppInfo(): JsonObject = storage.loadConfig()
}
