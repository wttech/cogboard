package com.cognifide.cogboard.ssh.auth

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.ssh.auth.AuthenticationType.BASIC
import com.cognifide.cogboard.ssh.auth.AuthenticationType.SSH_KEY
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.net.URI

class SSHAuthData(config: JsonObject) {
    private val id = config.getString(Props.ID, "")
    val user: String = config.getString(Props.USER, "")
    val password: String = config.getString(Props.PASSWORD, "")
    val token: String = config.getString(Props.TOKEN, "")
    var key = config.getString(Props.SSH_KEY, "")
        private set
    val host: String
    val port: Int
    val authenticationType = fromConfigAuthenticationType(config)

    init {
        val uriString = config.getJsonObject(Props.ENDPOINT_LOADED)?.getString(Props.URL) ?: ""
        val uri = URI.create(uriString)
        host = uri.host
        port = uri.port
        if (authenticationType == SSH_KEY) {
            prepareForSSHKeyUsage()
        }
    }

    private fun fromConfigAuthenticationType(config: JsonObject): AuthenticationType {
        val authTypes = config.getString(Props.AUTHENTICATION_TYPES)?.let {
            Json.decodeValue(it) } ?: JsonArray()

        return (authTypes as JsonArray)
                .map { AuthenticationType.valueOf(it.toString()) }
                .firstOrNull { hasAuthTypeCorrectCredentials(it) } ?: BASIC
    }

    private fun hasAuthTypeCorrectCredentials(authType: AuthenticationType): Boolean =
            when {
                authType == SSH_KEY && key.isNotBlank() -> true
                else -> authType == BASIC && user.isNotBlank() && password.isNotBlank()
            }

    private fun prepareForSSHKeyUsage() {
        val fileHelper = SSHKeyFileHelper(id, key)
        fileHelper.saveToFile()
        key = fileHelper.path
    }

    fun getAuthenticationString(): String =
            when (authenticationType) {
                BASIC -> password
                SSH_KEY -> key
            }
}
