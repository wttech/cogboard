package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.strategy.EndpointsConfig.Companion.ENDPOINTS_ARRAY
import com.cognifide.cogboard.config.strategy.EndpointsConfig.Companion.PASSWORD
import com.cognifide.cogboard.config.strategy.EndpointsConfig.Companion.USER
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointLoader(private val endpointsConfig: JsonArray, private val credentialsConfig: JsonArray, private val endpointId: String) {

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
        const val CREDENTIALS = "credentials"

        fun from(config: JsonObject, endpointId: String): EndpointLoader {
            val endpoints = config.getJsonArray(ENDPOINTS_ARRAY) ?: JsonArray()
            val credentials = config.getJsonArray(CREDENTIALS) ?: JsonArray()
            return EndpointLoader(endpoints, credentials, endpointId)
        }
    }
}

