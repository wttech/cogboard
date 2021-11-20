package com.cognifide.cogboard.ssh.auth

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.ssh.auth.AuthenticationType.BASIC
import com.cognifide.cogboard.ssh.auth.AuthenticationType.SSH_KEY
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.net.URI

class SSHAuthData(private val config: JsonObject) {
    val user: String = config.getString(Props.USER, "")
    val password: String = config.getString(Props.PASSWORD, "")
    val token: String = config.getString(Props.TOKEN, "")
    val key: String = config.getString(Props.SSH_KEY, "")
    val host: String
    val port: Int
    val authenticationType = fromConfigAuthenticationType()

    init {
        val uriString = config.getJsonObject(Props.ENDPOINT_LOADED)?.getString(Props.URL) ?: ""
        val uri = URI.create(uriString)
        host = uri.host
        port = uri.port
    }

    private fun fromConfigAuthenticationType(): AuthenticationType {
        val authTypesString = config.getString(Props.AUTHENTICATION_TYPES)

        val authTypes = authTypesString?.let { Json.decodeValue(authTypesString) } ?: JsonArray()

        return (authTypes as JsonArray)
                .map { AuthenticationType.valueOf(it.toString()) }
                .firstOrNull { hasAuthTypeCorrectCredentials(it) } ?: BASIC
    }

    private fun hasAuthTypeCorrectCredentials(authType: AuthenticationType): Boolean =
            when {
                authType == SSH_KEY && key.isNotBlank() -> true
                else -> authType == BASIC && user.isNotBlank() && password.isNotBlank()
            }

    fun getAuthenticationString(): String =
            when (authenticationType) {
                BASIC -> config.getString(Props.PASSWORD)
                SSH_KEY -> config.getString(Props.SSH_KEY)
            }
}
