package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.util.*

class EndpointLoader(private val endpointsConfig: JsonArray, private val credentialsConfig: JsonArray, private val endpointId: String) {

    fun asJson(withSensitiveData: Boolean): JsonObject {
        val endpoint = findEndpointById(endpointId, endpointsConfig)
        if (withSensitiveData) endpoint.map { attachUserPassword(it) }
        return endpoint.orElse(JsonObject())
    }

    private fun attachUserPassword(endpoint: JsonObject): JsonObject {
        endpoint.remove(CREDENTIALS)?.let {
            val credentials = findEndpointById(it as String, credentialsConfig)
                    .orElse(JsonObject())
            endpoint.put(USER, credentials.getString(USER) ?: "")
            endpoint.put(PASSWORD, credentials.getString(PASSWORD) ?: "")
        }

        return endpoint
    }

    private fun findEndpointById(endpointId: String, endpoints: JsonArray): Optional<JsonObject> {
        return endpoints.stream()
                .map { it as JsonObject }
                .filter { it.getString(ENDPOINT_ID_PROP) == endpointId }
                .findFirst()
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

