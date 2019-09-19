package com.cognifide.cogboard.config.endpoints

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.util.*

class EndpointLoader(private val endpointsConfig: JsonArray, private val credentialsConfig: JsonArray, private val endpointId: String) {

    fun asJson(withUserPassword: Boolean): JsonObject {
        val endpointJson = findEndpointById(endpointId, endpointsConfig)
        if (withUserPassword) endpointJson.map { attachUserPassword(it) }
        return endpointJson.orElse(JsonObject())
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

    private fun findEndpointById(id: String?, array: JsonArray): Optional<JsonObject> {
        return array.stream()
                .map { it as JsonObject }
                .filter {
                    id == it.getString(ID)
                }.findFirst()
    }

    companion object {
        const val CREDENTIALS = "credentials"
        const val ENDPOINTS = "endpoints"
        private const val ID = "id"
        private const val USER = "user"
        private const val PASSWORD = "password"

        fun from(config: JsonObject, endpointId: String): EndpointLoader {
            val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
            val credentials = config.getJsonArray(CREDENTIALS) ?: JsonArray()
            return EndpointLoader(endpoints, credentials, endpointId)
        }
    }
}

