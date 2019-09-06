package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.util.*

class Endpoint(val endpoints: JsonArray, val credentials: JsonArray) {

    fun readById(endpointId: String) : JsonObject {
      return findJsonObjectById(endpointId, endpoints)
                .map { attachCredentials(it) }
                .orElse(JsonObject())
    }

    private fun attachCredentials(endpoint: JsonObject): JsonObject {
        endpoint.remove(CREDENTIALS).toString().let {
            val credentials = findJsonObjectById(it, credentials)
                    .orElse(JsonObject())
            endpoint.put(USER, credentials.getString(USER)?: "")
            endpoint.put(PASSWORD, credentials.getString(PASSWORD)?: "")
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
        const val ID = "id"
        const val CREDENTIALS = "credentials"
        const val USER = "user"
        const val PASSWORD = "password"
    }
}