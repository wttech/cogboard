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
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
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
        coroutineScope.launch {
            try {
                connect(config)
            } catch (e: JSchException) {
                val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
                sendError(e, eventBusAddress)
            }
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
            } else {
                LOGGER.error("Failed to connect to ${authData.host}")
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
        val responseBuffer = readResponse()
        vertx.eventBus().send(eventBusAddress, responseBuffer)
        channel.disconnect()
        session.disconnect()
    }

    private fun readResponse(): Buffer {
        val responseBuffer = Buffer.buffer()
        val tmpBuf = ByteArray(512)
        var readBytes = sshInputStream.read(tmpBuf, 0, 512)
        while (readBytes != -1) {
            responseBuffer.appendBytes(tmpBuf, 0, readBytes)
            readBytes = sshInputStream.read(tmpBuf, 0, 512)
        }

        return responseBuffer
    }

    private fun sendError(e: Exception, eventBusAddress: String) {
        LOGGER.error(e.message)
        vertx.eventBus().send(eventBusAddress, e.message)
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(SSHClient::class.java)

        val coroutineScope = CoroutineScope(Job() + Dispatchers.IO)
    }
}
