package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.CredentialsConfig
import com.cognifide.cogboard.config.utils.JsonUtils.getObjectPositionById
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class CredentialsService(private val config: JsonObject, vertx: Vertx) {

    private var storage: Storage = VolumeStorage(ConfigType.CREDENTIALS, vertx)

    fun loadConfig(): JsonObject = storage.loadConfig()

    fun delete(credentialId: String) {
        val credentials = config.getJsonArray(CredentialsConfig.CREDENTIALS_ARRAY) ?: JsonArray()
        credentials.stream()
                .map { it as JsonObject }
                .map { it.getString(CredentialsConfig.CREDENTIAL_ID_PROP) }
                .filter { credentialId == it }
                .findFirst()
                .ifPresent { credentials.removeCredentialById(it) }

        storage.saveConfig(config)
    }

    private fun JsonArray.removeCredentialById(id: String) {
        val credentialPosition = this.getObjectPositionById(CredentialsConfig.CREDENTIAL_ID_PROP, id)
        this.remove(credentialPosition)
    }


}