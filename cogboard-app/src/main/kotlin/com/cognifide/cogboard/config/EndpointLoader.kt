package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.EndpointsConfig.Companion.CREDENTIALS_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.PASSWORD_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.TOKEN_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.USER_PROP
import com.cognifide.cogboard.config.service.CredentialsService
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.config.utils.JsonUtils.findById
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointLoader(
    endpointsConfig: JsonObject = EndpointsService().loadConfig(),
    credentialsConfig: JsonObject = CredentialsService().loadConfig()
) {

    private val endpoints = endpointsConfig.getJsonArray(EndpointsConfig.ENDPOINTS_ARRAY) ?: JsonArray()

    private val credentials = credentialsConfig.getJsonArray(CredentialsConfig.CREDENTIALS_ARRAY) ?: JsonArray()

    fun load(endpointId: String): JsonObject {
        return endpoints.findById(endpointId)
    }

    fun loadWithSensitiveData(endpointId: String): JsonObject {
        return load(endpointId).attachCredentials()
    }

    private fun JsonObject.attachCredentials(): JsonObject {
        this.remove(CREDENTIALS_PROP)?.let { credId ->
            credentials.findById(credId as String).let { credentials ->
                this.put(USER_PROP, credentials.getString(USER_PROP) ?: "")
                this.put(PASSWORD_PROP, credentials.getString(PASSWORD_PROP) ?: "")
                this.put(TOKEN_PROP, credentials.getString(TOKEN_PROP) ?: "")
            }
        }
        return this
    }
}
