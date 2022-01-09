package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.cognifide.cogboard.ssh.session.SessionStrategyFactory
import com.jcraft.jsch.ChannelExec
import com.jcraft.jsch.JSch
import com.jcraft.jsch.JSchException
import com.jcraft.jsch.Session
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.IOException
import java.io.InputStream
import java.nio.charset.Charset

class SSHClient(private val config: JsonObject) {
    private var session: Session? = null
    private var jsch: JSch? = null

    private fun openSession() {
        val authData = SSHAuthData(config)
        val jsch = JSch()
        val session = SessionStrategyFactory(jsch).create(authData).initSession()
        session.setConfig("StrictHostKeyChecking", "no")
        try {
            session.connect(CogboardConstants.Props.SSH_TIMEOUT)
        } catch (exception: JSchException) {
            LOGGER.error("Cannot connect to SSH server: $exception")
        }
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

        return try {
            readResponse(inputStream)
        } catch (e: IOException) {
            e.message
        } finally {
            channel.disconnect()
        }
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
        private val LOGGER: Logger = LoggerFactory.getLogger(SSHClient::class.java)
        private const val BUFFER_SIZE: Int = 512
    }
}
