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
import java.nio.charset.Charset

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
        LOGGER.info(config)
        coroutineScope.launch {
            try {
                connect(config)
                executeCommandAndSendResult(config)
            } catch (e: JSchException) {
                LOGGER.error(e.message)
                val eventBusAddress = config.getString(CogboardConstants.Props.EVENT_ADDRESS)
                vertx.eventBus().send(eventBusAddress, e.message)
            }
        }
    }

    private suspend fun connect(config: JsonObject) {
        val authData = SSHAuthData(config)
        createSSHChannel(authData)
    }

    private suspend fun createSSHChannel(authData: SSHAuthData) {
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
        val tmpBuf = ByteArray(BUFFER_SIZE)
        var readBytes = sshInputStream.read(tmpBuf, 0, BUFFER_SIZE)
        while (readBytes != -1) {
            responseBuffer.appendBytes(tmpBuf, 0, readBytes)
            readBytes = sshInputStream.read(tmpBuf, 0, BUFFER_SIZE)
        }

        return responseBuffer
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(SSHClient::class.java)
        private const val BUFFER_SIZE: Int = 512
        val coroutineScope = CoroutineScope(Job() + Dispatchers.IO)
    }
}

class SSHCoroutineClient(private val config: JsonObject) {
    private var session: Session? = null
    private var jsch: JSch? = null

    private fun openSession() {
        LOGGER.info(config)
        val authData = SSHAuthData(config)
        val jsch = JSch()
        // jsch.setKnownHosts("~/.ssh/known_hosts")  for security reasons this should be used
        val session = SessionStrategyFactory(jsch).create(authData).initSession()
        session.setConfig("StrictHostKeyChecking", "no") // not secure
        session.connect(CogboardConstants.Props.SSH_TIMEOUT)
        this.session = session
        this.jsch = jsch
    }

    fun closeSession() {
        session?.disconnect()
        session = null
        jsch = null
    }

    fun execute(command: String): String? {
        if (session == null || jsch == null) {
            openSession()
        }
        if (session?.isConnected != true) {
            return null
        }
        val (channel, inputStream) = createChannel(command) ?: return null
        val response = readResponse(inputStream)
        channel.disconnect()
        return response
    }

    fun executeAndClose(command: String): String? {
        val result = execute(command)
        closeSession()
        return result
    }

    private fun createChannel(command: String): Pair<ChannelExec, InputStream>? {
        val session = session ?: return null
        val channel = session.openChannel("exec") as ChannelExec
        channel.setCommand(command)
        channel.inputStream = null
        val inputStream = channel.inputStream
        channel.connect(CogboardConstants.Props.SSH_TIMEOUT)
        return Pair(channel, inputStream)
    }

    private fun readResponse(stream: InputStream): String? {
        val responseBuffer = Buffer.buffer()
        val tmpBuf = ByteArray(BUFFER_SIZE)
        var readBytes = stream.read(tmpBuf, 0, BUFFER_SIZE)
        while (readBytes != -1) {
            responseBuffer.appendBytes(tmpBuf, 0, readBytes)
            readBytes = stream.read(tmpBuf, 0, BUFFER_SIZE)
        }
        return responseBuffer.toString(Charset.defaultCharset())
    }

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(SSHCoroutineClient::class.java)
        private const val BUFFER_SIZE: Int = 512
    }
}
