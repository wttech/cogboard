package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.ConnectionType
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.RequestMethod
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*

class LogViewerTest: WidgetTestBase() {

    private lateinit var widget: LogViewerWidget

    override fun widgetName(): String {
        return "LogViewerWidget"
    }

    @BeforeEach
    fun initForTest() {
        super.init()
    }

    @Test
    fun `Expect Buffer consumer to be used when type is SSH`() {
        val consumerMock = mock(MessageConsumer::class.java) as MessageConsumer<Buffer>
        `when`(eventBus.consumer<Buffer>(anyString())).thenReturn(consumerMock)

        val config = initWidget()
                .put(Props.LOG_SOURCE_TYPE, ConnectionType.SSH)
                .put(Props.LOG_SOURCE, "192.168.0.1")
                .put(Props.LOG_LINES, "5")
        widget = LogViewerWidget(vertx, config, initService())

        widget.start()

        verify(eventBus).consumer<Buffer>(eq(widget.eventBusAddress))
    }

    @Test
    fun `Expect JsonObject consumer to be used when type is HTTP`() {
        val consumerMock = mock(MessageConsumer::class.java) as MessageConsumer<JsonObject>
        `when`(eventBus.consumer<JsonObject>(anyString())).thenReturn(consumerMock)

        val config = initWidget()
                .put(Props.LOG_SOURCE_TYPE, ConnectionType.HTTP)
                .put(Props.LOG_REQUEST_TYPE, RequestMethod.GET)
                .put(Props.LOG_SOURCE, "192.168.0.1")
                .put(Props.LOG_LINES, "5")
        widget = LogViewerWidget(vertx, config, initService())

        widget.start()

        verify(eventBus).consumer<JsonObject>(eq(widget.eventBusAddress))
    }
}