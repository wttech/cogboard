package com.cognifide.cogboard.ssh.auth

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.AuthenticationType.BASIC
import com.cognifide.cogboard.ssh.auth.AuthenticationType.SSH_KEY
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class SSHAuthData(private val config: JsonObject) {
    val user = config.getString(CogboardConstants.Props.USER) ?: ""
    val password = config.getString(CogboardConstants.Props.PASSWORD) ?: ""
    val token = config.getString(CogboardConstants.Props.TOKEN) ?: ""
    val key = config.getString(CogboardConstants.Props.SSH_KEY) ?: ""
    val host = config.getString(CogboardConstants.Props.SSH_HOST) ?: ""
    val port = config.getInteger(CogboardConstants.Props.SSH_PORT) ?: 22
    val authenticationType = fromConfigAuthenticationType()

    private fun fromConfigAuthenticationType(): AuthenticationType {
        val authTypesString = config.getString(CogboardConstants.Props.AUTHENTICATION_TYPES)

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
                BASIC -> config.getString(CogboardConstants.Props.PASSWORD)
                SSH_KEY -> config.getString(CogboardConstants.Props.SSH_KEY)
            }

    fun createCommand(): String {
        val logLines = config.getString(CogboardConstants.Props.LOG_LINES) ?: "0"
        val logFilePath = config.getString(CogboardConstants.Props.LOG_FILE_PATH) ?: ""

        return "cat $logFilePath | tail -$logLines"
    }
}
