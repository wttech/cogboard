package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.ssh.auth.AuthenticationType
import com.jcraft.jsch.JSchException
import io.vertx.core.Vertx
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.EventBus
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.ArgumentCaptor
import org.mockito.ArgumentMatchers.*
import org.mockito.Captor
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations.initMocks
import org.mockito.junit.jupiter.MockitoExtension

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension::class)
class SSHClientTest {
    private lateinit var sshClient: SSHClient

    @Captor
    private lateinit var bufferCaptor: ArgumentCaptor<Buffer>

    @Captor
    private lateinit var exceptionCaptor: ArgumentCaptor<Exception>

    private lateinit var config: JsonObject

    @Mock
    lateinit var vertx: Vertx

    @Mock
    lateinit var eventBus: EventBus

    @BeforeEach
    fun init() {
        sshClient = SSHClient()
        initMocks(this)
        `when`(vertx.eventBus()).thenReturn(eventBus)
        sshClient.init(vertx, null)
    }

    private fun generateConfig(authTypes: Set<AuthenticationType>) {
        config = JsonObject()
                .put(CogboardConstants.Props.USER, "mock")
                .put(CogboardConstants.Props.PASSWORD, "TLQuoLMn*T89&Y*r*YqHviSFH6MkR!4E")
                .put(CogboardConstants.Props.TOKEN, "TLQuoLMn*T89&Y*r*YqHviSFH6MkR!4E")
                .put(CogboardConstants.Props.SSH_KEY, SSHClientTest::class.java.getResource(
                        "/com/cognifide/cogboard/ssh/id_rsa").path)
                .put(CogboardConstants.Props.SSH_HOST, "150.254.30.120")
                .put(CogboardConstants.Props.LOG_FILE_PATH, "/home/mock/example.txt")
                .put(CogboardConstants.Props.LOG_LINES, "1")
                .put(CogboardConstants.Props.AUTHENTICATION_TYPES, Json.encode(authTypes))
                .put(CogboardConstants.Props.EVENT_ADDRESS, "ssh.test.address")
    }

    @Test
    fun `Executing commands with user+password authentication succeeds`() {
        generateConfig(setOf(AuthenticationType.BASIC))

        sshClient.tryToConnect(config)
        val (result, exception) = captureWhatIsSent(eventBus, bufferCaptor, exceptionCaptor)

        result?.let {
            assertEquals("19:28:11.445 [vert.x-eventloop-thread-2] " +
                    "ERROR c.cognifide.cogboard.http.HttpClient - Connection was closed\n",
                    it.getString(0, it.length())
            )
        }
        assert(exception == null)
    }

    @Test
    fun `Executing commands using key authentication succeeds`() {
        generateConfig(setOf(AuthenticationType.SSH_KEY))

        sshClient.tryToConnect(config)
        val (result, exception) = captureWhatIsSent(eventBus, bufferCaptor, exceptionCaptor)

        result?.let {
            assertEquals("19:28:11.445 [vert.x-eventloop-thread-2] " +
                    "ERROR c.cognifide.cogboard.http.HttpClient - Connection was closed\n",
                    it.getString(0, it.length())
            )
        }
        assert(exception == null)
    }

    @Test
    fun `Executing commands with wrong credentials fails`() {
        generateConfig(setOf(AuthenticationType.BASIC))
        config.remove(CogboardConstants.Props.PASSWORD)
        config.put(CogboardConstants.Props.PASSWORD, "wrong")

        sshClient.tryToConnect(config)

        val (result, exception) = captureWhatIsSent(eventBus, bufferCaptor, exceptionCaptor)

        assert(result == null)
        assert(exception is JSchException)
    }

    private fun captureWhatIsSent(eventBus: EventBus,
                                  bufferCaptor: ArgumentCaptor<Buffer>,
                                  exceptionCaptor: ArgumentCaptor<Exception>
    ): Pair<Buffer?, Exception?>{
        return try {
            verify(eventBus).send(eq("ssh.test.address"), bufferCaptor.capture())
            verify(eventBus, times(0)).send(eq("ssh.test.address"), any(Exception::class.java))
            Pair(bufferCaptor.value, null)
        } catch (e: Throwable) {
            verify(eventBus, times(0)).send(eq("ssh.test.address"), any(Buffer::class.java))
            verify(eventBus).send(eq("ssh.test.address"), exceptionCaptor.capture())
            Pair(null, exceptionCaptor.value)
        }
    }
}