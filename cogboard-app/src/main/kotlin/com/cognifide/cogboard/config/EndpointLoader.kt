package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.CREDENTIALS_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.PASSWORD_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.USER_PROP
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointLoader(endpointsConfig: JsonObject) {

    private val endpoints = endpointsConfig.getJsonArray(EndpointsConfig.ENDPOINTS_ARRAY) ?: JsonArray()

    private val credentials = CredentialsConfig()
            .load()
            .getJsonArray(CredentialsConfig.CREDENTIALS_ARRAY) ?: JsonArray()

    fun load(endpointId: String): JsonObject {
        return endpoints.findById(endpointId)
    }

    fun loadWithSensitiveData(endpointId: String): JsonObject {
        return load(endpointId).attachUserPassword()
    }

    private fun JsonArray.findById(id: String): JsonObject {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(CogboardConstants.PROP_ID) == id }
                .findFirst()
                .orElse(JsonObject())
    }

    private fun JsonObject.attachUserPassword(): JsonObject {
        this.remove(CREDENTIALS_PROP)?.let { credId ->
            credentials.findById(credId as String).let { credentials ->
                this.put(USER_PROP, credentials.getString(USER_PROP) ?: "")
                this.put(PASSWORD_PROP, credentials.getString(PASSWORD_PROP) ?: "")
            }
        }
        return this
    }
}

