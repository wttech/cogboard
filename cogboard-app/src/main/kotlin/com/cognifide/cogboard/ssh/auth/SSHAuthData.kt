package com.cognifide.cogboard.ssh.auth

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class SSHAuthData(private val config: JsonObject) {
    val user = config.getString(CogboardConstants.Props.USER) ?: ""
    val password = config.getString(CogboardConstants.Props.PASSWORD) ?: ""
    val token = config.getString(CogboardConstants.Props.TOKEN) ?: ""
    val key = config.getString(CogboardConstants.Props.SSH_KEY) ?: ""
    val host = config.getString(CogboardConstants.Props.SSH_HOST) ?: ""
    val authenticationType = fromConfigAuthenticationType()

    private fun fromConfigAuthenticationType(): AuthenticationType {
        val authTypesString = config.getString(CogboardConstants.Props.AUTHENTICATION_TYPES)

        val authTypes = if (authTypesString != null) Json.decodeValue(authTypesString)
        else JsonArray()

        return (authTypes as JsonArray).stream()
                .map { AuthenticationType.valueOf(it.toString()) }
                .filter { hasAuthTypeCorrectCredentials(it) }
                .findFirst()
                .orElse(AuthenticationType.BASIC)
    }

    private fun hasAuthTypeCorrectCredentials(authType: AuthenticationType): Boolean =
            when {
                authType == AuthenticationType.TOKEN && user.isNotBlank() && token.isNotBlank() -> true
                authType == AuthenticationType.SSH_KEY && key.isNotBlank() -> true
                else -> authType == AuthenticationType.BASIC && user.isNotBlank() && password.isNotBlank()
            }

    fun getAuthenticationString(): String =
            when (authenticationType) {
                AuthenticationType.BASIC -> config.getString(CogboardConstants.Props.PASSWORD)
                AuthenticationType.TOKEN -> config.getString(CogboardConstants.Props.TOKEN)
                AuthenticationType.SSH_KEY -> config.getString(CogboardConstants.Props.SSH_KEY)
            }

    fun createCommand(): String {
        val logLines = config.getString(CogboardConstants.Props.LOG_LINES) ?: "0"
        val logFilePath = config.getString(CogboardConstants.Props.LOG_FILE_PATH) ?: ""

        return "cat $logFilePath | tail -$logLines"
    }
}
