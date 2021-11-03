package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.cognifide.cogboard.ssh.session.SessionStrategyFactory
import com.jcraft.jsch.ChannelExec
import com.jcraft.jsch.JSch
import com.jcraft.jsch.JSchException
import com.jcraft.jsch.Session
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
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

        try {
            connect(config)
        } catch (e: JSchException) {
            LOGGER.error(e.message)
            val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
            vertx.eventBus().send(eventBusAddress, e)
        }
    }

    private fun connect(config: JsonObject) {
        val authData = SSHAuthData(config)
        createSSHChannel(authData)
        executeCommandAndSendResult(config)
    }

    private fun createSSHChannel(authData: SSHAuthData) {
        with(authData) {
            initSSHSession(authData)
            if (session.isConnected) {
                createChannel(createCommand())
            }
        }
    }

    private fun initSSHSession(authData: SSHAuthData) {
        jsch = JSch()
        // jsch.setKnownHosts("~/.ssh/known_hosts")  for security reasons this should be used
        session = SessionStrategyFactory(jsch).create(authData).initSession()
        session.setConfig("StrictHostKeyChecking", "no") // not secure
        session.connect(CogboardConstants.Props.SSH_TIMEOUT)
    }

    private fun createChannel(command: String) {
        channel = session.openChannel("exec") as ChannelExec
        channel.setCommand(command)
        channel.inputStream = null
        sshInputStream = channel.inputStream
        channel.connect(CogboardConstants.Props.SSH_TIMEOUT)
    }

    private fun executeCommandAndSendResult(config: JsonObject) {
        val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
        val responseBuffer = Buffer.buffer()
        responseBuffer.appendBytes(sshInputStream.readAllBytes())
        vertx.eventBus().send(eventBusAddress, responseBuffer)
        channel.disconnect()
        session.disconnect()
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(SSHClient::class.java)
    }
}
