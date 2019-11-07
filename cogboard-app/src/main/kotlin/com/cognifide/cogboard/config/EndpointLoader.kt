package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointLoader(
    private val endpointsConfig: JsonArray,
    private val credentialsConfig: JsonArray,
    private val endpointId: String
) {

    fun load(): JsonObject {
       return endpointsConfig.findById(endpointId)
    }

    fun loadWithSensitiveData(): JsonObject {
        return load().attachUserPassword()
    }

    private fun JsonObject.attachUserPassword(): JsonObject {
        this.remove(CREDENTIALS)?.let { credId ->
            credentialsConfig.findById(credId as String).let { credentials ->
                this.put(USER, credentials.getString(USER) ?: "")
                this.put(PASSWORD, credentials.getString(PASSWORD) ?: "")
            }
        }
        return this
    }

    private fun JsonArray.findById(id: String): JsonObject {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(CogboardConstants.PROP_ID) == id }
                .findFirst()
                .orElse(JsonObject())
    }

    companion object {
        const val ENDPOINT_ID_PROP = "id"
        const val ENDPOINT_ID_PREFIX = "endpoint"
        const val ENDPOINT_LABEL_PROP = "label"
        const val ENDPOINT_URL_PROP = "label"
        const val ENDPOINT_PUBLIC_URL_PROP = "label"
        const val CREDENTIALS = "credentials"
        const val ENDPOINTS = "endpoints"
        private const val USER = "user"
        private const val PASSWORD = "password"

        fun from(config: JsonObject, endpointId: String): EndpointLoader {
            val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
            val credentials = config.getJsonArray(CREDENTIALS) ?: JsonArray()
            return EndpointLoader(endpoints, credentials, endpointId)
        }
    }
}
