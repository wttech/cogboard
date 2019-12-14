package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIALS_ARRAY
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PREFIX
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_LABEL_PROP
import com.cognifide.cogboard.config.utils.JsonUtils.findById
import com.cognifide.cogboard.config.utils.JsonUtils.getObjectPositionById
import com.cognifide.cogboard.config.utils.JsonUtils.putIfNotExist
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.credentials
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class CredentialsService(
    private val storage: Storage,
    private val config: JsonObject = credentials().loadConfig()
) {

    fun loadConfig(): JsonObject = credentials().loadConfig()

    fun getCredentials(): JsonArray = credentials().loadConfig().getJsonArray(CREDENTIALS_ARRAY)

    fun getCredential(credentialId: String): JsonObject {
        return getCredentials().findById(credentialId)
    }

    fun save(credential: JsonObject): JsonObject {
        if (exists(credential)) update(credential) else add(credential)
        storage.saveConfig(config)
        return credential
    }

    private fun exists(credential: JsonObject): Boolean {
        val credentialId = credential.getString(CREDENTIAL_ID_PROP) ?: return false
        val credentials = getCredentialsFromConfig()
        return credentials.stream()
                .map { it as JsonObject }
                .anyMatch {
                    credentialId == it.getString(CREDENTIAL_ID_PROP)
                }
    }

    private fun update(credential: JsonObject) {
        if (CredentialsValidator.validateCredential(credential)) {
            val credentialId = credential.getString(CREDENTIAL_ID_PROP)
            val credentials = getCredentialsFromConfig()
            val credentialToUpdate = credentials.findById(credentialId)
            credentialToUpdate.mergeIn(credential, true)
        }
    }

    private fun getCredentialsFromConfig(): JsonArray = config.getJsonArray(CREDENTIALS_ARRAY)
            ?: JsonArray()

    private fun add(credential: JsonObject) {
        setIdAndLabel(credential)
        if (CredentialsValidator.validateCredential(credential)) {
            config
                    .putIfNotExist(CREDENTIALS_ARRAY, JsonArray())
                    .getJsonArray(CREDENTIALS_ARRAY)
                    .add(credential)
        }
    }

    private fun generateId(): String {
        val credentials = getCredentialsFromConfig()
        val lastId: Long = credentials.stream()
                .map { it as JsonObject }
                .mapToLong { it.getString(CREDENTIAL_ID_PROP).replace(CREDENTIAL_ID_PREFIX, "").toLong() }
                .max()
                .orElse(0L)

        return CREDENTIAL_ID_PREFIX + (lastId + 1)
    }

    private fun setIdAndLabel(credential: JsonObject) {
        credential.let {
            it.put(CREDENTIAL_ID_PROP, generateId())
            it.put(CREDENTIAL_LABEL_PROP, it.getString(CREDENTIAL_LABEL_PROP)
                    ?: it.getString(CREDENTIAL_ID_PROP))
        }
    }

    fun delete(credentialId: String) {
        val credentials = config.getJsonArray(CREDENTIALS_ARRAY) ?: JsonArray()
        credentials.stream()
                .map { it as JsonObject }
                .map { it.getString(CREDENTIAL_ID_PROP) }
                .filter { credentialId == it }
                .findFirst()
                .ifPresent { credentials.removeCredentialById(it) }

        storage.saveConfig(config)
    }

    private fun JsonArray.removeCredentialById(id: String) {
        val credentialPosition = this.getObjectPositionById(id)
        this.remove(credentialPosition)
    }
}
