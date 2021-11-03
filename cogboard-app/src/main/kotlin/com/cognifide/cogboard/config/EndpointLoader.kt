package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.EndpointsConfig.Companion.CREDENTIALS_PROP
import com.cognifide.cogboard.config.service.CredentialsService
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.utils.ExtensionFunctions.findById
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
                this.put(Props.USER, credentials.getString(Props.USER) ?: "")
                this.put(Props.PASSWORD, credentials.getString(Props.PASSWORD) ?: "")
                this.put(Props.TOKEN, credentials.getString(Props.TOKEN) ?: "")
                this.put(Props.SSH_KEY, credentials.getString(Props.SSH_KEY) ?: "")
                this.put(Props.SSH_KEY_PASSPHRASE, credentials.getString(Props.SSH_KEY_PASSPHRASE) ?: "")
            }
        }
        return this
    }
}
