package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.AuthenticationType
import com.jcraft.jsch.Channel
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session
import io.reactivex.functions.Consumer
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.io.InputStream
import java.io.OutputStream
import kotlin.properties.Delegates

class SSHClient : AbstractVerticle() {
    private lateinit var session: Session
    private lateinit var jsch: JSch
    private lateinit var channel: Channel
    private lateinit var sshInputStream: InputStream
    private lateinit var sshOutputStream: OutputStream
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
        consumer = vertx.eventBus().consumer<JsonObject>(CogboardConstants.Event.SSH_COMMAND).handler { message ->
            message.body()?.let {
                connect(it)
            }
        }
    }

    private fun connect(config: JsonObject) {
        val user = config.getString(CogboardConstants.Props.USER) ?: ""
        val pass = config.getString(CogboardConstants.Props.PASSWORD) ?: ""
        val token = config.getString(CogboardConstants.Props.TOKEN) ?: ""
        val key = config.getString(CogboardConstants.Props.SSH_KEY) ?: ""
        val host = config.getString(CogboardConstants.Props.SSH_HOST) ?: ""

        val authTypesString = config.getString(CogboardConstants.Props.AUTHENTICATION_TYPES)

        val authTypes = if (authTypesString != null) Json.decodeValue(authTypesString)
        else JsonArray()

        val authenticationType = getAuthenticationType(authTypes as JsonArray, user, token, pass, key)

        jsch = JSch()

        when (authenticationType) {
            AuthenticationType.BASIC -> {
                session = jsch.getSession(user, host)
                session.setPassword(pass)
            }
            AuthenticationType.TOKEN -> {
                session = jsch.getSession(user, host)
                session.setPassword(token)
            }
            AuthenticationType.SSH_KEY -> {
                jsch.addIdentity(key)
                session = jsch.getSession(user, host)
            }
        }

        channel = session.openChannel("shell")

        sshInputStream = channel.inputStream
        sshOutputStream = channel.outputStream

        channel.connect(5000)

        if (channel.isConnected) {
            executeCommandAndSendResult(config)
        }
    }

    private fun executeCommandAndSendResult(config: JsonObject) {
        val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
        val logLines = config.getString(CogboardConstants.Props.LOG_LINES) ?: "0"
        val logFilePath = config.getString(CogboardConstants.Props.LOG_FILE_PATH) ?: ""

        val command = "cat $logFilePath | tail -$logLines"
        sshOutputStream.write(command.toByteArray())
        val responseBuffer = Buffer.buffer()
        Delegates.observable(sshInputStream.available()) { _, _, newValue ->
            if (newValue > 0) {
                responseBuffer.appendBytes(sshInputStream.readAllBytes())
            }

            vertx.eventBus().send(eventBusAddress, responseBuffer)
            channel.disconnect()
            session.disconnect()
        }
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