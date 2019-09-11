package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.util.*

class Endpoint(val endpoints: JsonArray, val credentials: JsonArray, val endpointId: String) {

    fun asJson(withUserPassword: Boolean): JsonObject {
        val endpointJson = findJsonObjectById(endpointId, endpoints)
        if (withUserPassword) endpointJson.map { attachUserPassword(it) }
        return endpointJson.orElse(JsonObject())
    }

    private fun attachUserPassword(endpoint: JsonObject): JsonObject {
        endpoint.remove(CREDENTIALS).toString().let {
            val credentials = findJsonObjectById(it, credentials)
                    .orElse(JsonObject())
            endpoint.put(USER, credentials.getString(USER) ?: "")
            endpoint.put(PASSWORD, credentials.getString(PASSWORD) ?: "")
        }

        return endpoint
    }

    private fun findJsonObjectById(id: String?, array: JsonArray): Optional<JsonObject> {
        return array.stream()
                .map { it as JsonObject }
                .filter {
                    id == it.getString(ID)
                }.findFirst()
    }

    companion object {
        private const val ID = "id"
        private const val CREDENTIALS = "credentials"
        private const val ENDPOINTS = "endpoints"
        private const val USER = "user"
        private const val PASSWORD = "password"

        fun from(config: JsonObject, endpointId: String): Endpoint {
            val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
            val credentials = config.getJsonArray(CREDENTIALS) ?: JsonArray()
            return Endpoint(endpoints, credentials, endpointId)
        }

        fun exists(config: JsonObject, endpointId: String?): Boolean {
            val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
            return endpoints.stream()
                    .map { it as JsonObject }
                    .anyMatch {
                        endpointId == it.getString(ID)
                    }
        }
    }
}