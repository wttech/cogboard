package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.AuthenticationType
import com.jcraft.jsch.ChannelExec
import com.jcraft.jsch.JSch
import com.jcraft.jsch.JSchException
import com.jcraft.jsch.Session
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.io.InputStream

class SSHClient : AbstractVerticle() {
    private lateinit var session: Session
    private lateinit var jsch: JSch
    private lateinit var channel: ChannelExec
    private lateinit var sshInputStream: InputStream
    private lateinit var consumer: MessageConsumer<JsonObject>
    override fun start() {
        registerSSHCommand()
        super.start()
    }

    override fun stop() {
        consumer.unregister()
        super.stop()
    }

    private fun registerSSHCommand() {
        consumer = vertx.eventBus()
                .consumer<JsonObject>(CogboardConstants.Event.SSH_COMMAND)
                .handler { message ->
                    message.body()?.let {
                        tryToConnect(it)
                    }
                }
    }

    fun tryToConnect(config: JsonObject) {
        val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
        try {
            connect(config)
        } catch (e: Exception) {
            vertx.eventBus().send(eventBusAddress, e)
        }
    }

    fun connect(config: JsonObject) {
        val user = config.getString(CogboardConstants.Props.USER) ?: ""
        val pass = config.getString(CogboardConstants.Props.PASSWORD) ?: ""
        val token = config.getString(CogboardConstants.Props.TOKEN) ?: ""
        val key = config.getString(CogboardConstants.Props.SSH_KEY) ?: ""
        val host = config.getString(CogboardConstants.Props.SSH_HOST) ?: ""

        val authTypesString = config.getString(CogboardConstants.Props.AUTHENTICATION_TYPES)

        val authTypes = if (authTypesString != null) Json.decodeValue(authTypesString)
        else JsonArray()

        val authenticationType = getAuthenticationType(authTypes as JsonArray, user, token, pass, key)

        createSSHChannel(authenticationType, host, user, config)

        executeCommandAndSendResult(config)
    }

    private fun createCommand(config: JsonObject): String {
        val logLines = config.getString(CogboardConstants.Props.LOG_LINES) ?: "0"
        val logFilePath = config.getString(CogboardConstants.Props.LOG_FILE_PATH) ?: ""

        return "cat $logFilePath | tail -$logLines"
    }

    private fun createSSHChannel(
        authenticationType: AuthenticationType,
        host: String,
        user: String,
        config: JsonObject
    ) {
        initJsch(authenticationType, host, user, config)
        val command = createCommand(config)

        if (session.isConnected) {
            channel = session.openChannel("exec") as ChannelExec

            channel.setCommand(command)
            channel.inputStream = null
            sshInputStream = channel.inputStream

            channel.connect(CogboardConstants.Props.SSH_TIMEOUT)
        }
    }

    private fun initJsch(
        authenticationType: AuthenticationType,
        host: String,
        user: String,
        config: JsonObject
    ) {
        val securityString = getAuthenticationString(authenticationType, config)
        val passphrase = config.getString(CogboardConstants.Props.SSH_KEY_PASSPHRASE)

        jsch = JSch()
        jsch.setKnownHosts("~/.ssh/known_hosts")
        when (authenticationType) {
            AuthenticationType.BASIC -> {
                session = jsch.getSession(user, host)
                session.setPassword(securityString)
            }
            AuthenticationType.TOKEN -> {
                session = jsch.getSession(user, host)
                session.setPassword(securityString)
            }
            AuthenticationType.SSH_KEY -> {
                if (passphrase == null) {
                    jsch.addIdentity(securityString)
                } else {
                    jsch.addIdentity(securityString, passphrase)
                }
                session = jsch.getSession(user, host)
                session.setConfig("PreferredAuthentications", "publickey")
            }
        }
        session.connect(CogboardConstants.Props.SSH_TIMEOUT)
    }

    private fun getAuthenticationString(
        authenticationType: AuthenticationType,
        config: JsonObject
    ): String {
        return when (authenticationType) {
            AuthenticationType.BASIC -> config.getString(CogboardConstants.Props.PASSWORD)
            AuthenticationType.TOKEN -> config.getString(CogboardConstants.Props.TOKEN)
            AuthenticationType.SSH_KEY -> config.getString(CogboardConstants.Props.SSH_KEY)
        }
    }

    private fun executeCommandAndSendResult(config: JsonObject) {
        val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)

        val responseBuffer = Buffer.buffer()
        responseBuffer.appendBytes(sshInputStream.readAllBytes())

        vertx.eventBus().send(eventBusAddress, responseBuffer)
        channel.disconnect()
        session.disconnect()
    }

    private fun getAuthenticationType(
        authenticationTypes: JsonArray,
        user: String,
        token: String,
        pass: String,
        key: String
    ): AuthenticationType {

        return authenticationTypes.stream()
                .map { AuthenticationType.valueOf(it.toString()) }
                .filter { hasAuthTypeCorrectCredentials(it, user, token, pass, key) }
                .findFirst()
                .orElse(AuthenticationType.BASIC)
    }

    private fun hasAuthTypeCorrectCredentials(
        authType: AuthenticationType,
        username: String,
        token: String,
        pass: String,
        key: String
    ): Boolean {
        return when {
            authType == AuthenticationType.TOKEN && username.isNotBlank() && token.isNotBlank() -> true
            authType == AuthenticationType.SSH_KEY && key.isNotBlank() -> true
            else -> authType == AuthenticationType.BASIC && username.isNotBlank() && pass.isNotBlank()
        }
    }
}
