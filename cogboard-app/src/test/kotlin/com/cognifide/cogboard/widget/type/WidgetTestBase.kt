package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import io.vertx.core.Vertx
import io.vertx.core.eventbus.EventBus
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.mockito.ArgumentCaptor
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations.initMocks
import com.cognifide.cogboard.TestHelper.Companion.readConfigFromResource as load

abstract class WidgetTestBase {

    val successResponse: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/success.json")

    val failResponse: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/fail.json")

    val inProgressResponse: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/in-progress.json")

    lateinit var captor: ArgumentCaptor<JsonObject>

    @Mock
    lateinit var vertx: Vertx

    @Mock
    lateinit var eventBus: EventBus

    fun init() {
        initMocks(this)
        `when`(vertx.eventBus()).thenReturn(eventBus)
        captor = ArgumentCaptor.forClass(JsonObject::class.java)
    }

    abstract fun widgetName(): String

    open fun initWidget(): JsonObject = JsonObject().put("id", "widget-ID")

    fun initService(): BoardsConfigService {
        val boardPath = JenkinsJobWidgetTest::class.java.getResource("/board").path
        val contentRepository = ContentRepository(boardPath)
        return BoardsConfigService(contentRepository)
    }

    fun captureWhatIsSent(eventBus: EventBus, captor: ArgumentCaptor<JsonObject>): Pair<JsonObject, JsonObject> {
        verify(eventBus).send(eq("cogboard.websocket.message"), captor.capture())
        return Pair(captor.value, captor.value.getJsonObject(Props.CONTENT))
    }

    fun assertStatus(expected: String, result: JsonObject) {
        assertEquals(expected, result.getJsonObject(Props.CONTENT)
                .getString(Props.WIDGET_STATUS))
    }

    fun assertUpdateDatePresent(result: JsonObject) {
        assertNotNull(result.getJsonObject(Props.CONTENT)
                .getLong(Props.LAST_UPDATED))
    }

    fun assertURL(expected: String, result: JsonObject) {
        assertEquals(expected, result.getString(Props.URL))
    }
}
