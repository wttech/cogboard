package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.ssh.SSHClient
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.ssh.auth.AuthenticationType

class SSHConnectionStrategy(val config: JsonObject) : ConnectionStrategy() {

    override fun authenticationTypes(): Set<Any> {
        return setOf(AuthenticationType.BASIC, AuthenticationType.SSH_KEY)
    }

    override suspend fun getNumberOfLines(): Long? {
        val logFilePath = config.getString(Props.PATH) ?: return null

        return SSHClient(prepareConfig(config))
                .executeAndClose("wc -l < $logFilePath")
                ?.trim()
                ?.toLongOrNull()
    }

    override suspend fun getLogs(skipFirstLines: Long?): Collection<String> {
        val logFilePath = config.getString(Props.PATH) ?: return emptyList()
        val command = skipFirstLines?.let { "tail -n +${it + 1} $logFilePath" } ?: "cat $logFilePath"

        return SSHClient(prepareConfig(config))
                .executeAndClose(command)
                ?.trim()
                ?.lines()
                ?: emptyList()
    }

    private fun prepareConfig(config: JsonObject): JsonObject {
        val tmpConfig = prepareConfigLines(config,
                Props.USER,
                Props.PASSWORD,
                Props.TOKEN,
                Props.SSH_HOST,
                Props.SSH_KEY,
                Props.SSH_KEY_PASSPHRASE
        )

        tmpConfig.getString(Props.AUTHENTICATION_TYPES)
                ?: config.put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
        return tmpConfig
    }

    private fun prepareConfigLines(config: JsonObject, vararg fields: String): JsonObject {
        for (field in fields) {
            config.getString(field) ?: config.put(field, config.endpointProp(field))
        }
        return config
    }
}
