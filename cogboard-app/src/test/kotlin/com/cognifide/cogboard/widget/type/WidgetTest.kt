package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.TestHelper.Companion.readConfigFromResource as load
import io.vertx.core.Vertx
import io.vertx.core.eventbus.EventBus
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.*
import org.mockito.ArgumentCaptor
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations.initMocks

abstract class WidgetTest {

    val successResponce: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/success.json")

    val failResponce: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/fail.json")

    val inProgressResponce: JsonObject
        get() = load("/com/cognifide/cogboard/widget/type/${widgetName()}/in-progress.json")

    lateinit var captor: ArgumentCaptor<JsonObject>

    @Mock
    lateinit var vertx: Vertx

    @Mock
    lateinit var eventBus: EventBus

    fun init() {
        initMocks(this)
        `when`(vertx.eventBus()).thenReturn(eventBus)
    }

    abstract fun widgetName(): String


    fun initWidget(): JsonObject = JsonObject().put("id", "widget-ID")

    fun captureWhatIsSend(eventBus: EventBus, captor: ArgumentCaptor<JsonObject>): Pair<JsonObject, JsonObject> {
        verify(eventBus).send(eq("cogboard.websocket.message"), captor.capture())
        return Pair(captor.value, captor.value.getJsonObject(CogboardConstants.PROP_CONTENT))
    }

    fun assertStatus(expected: String, result: JsonObject) {
        assertEquals(expected, result.getString(CogboardConstants.PROP_STATUS))
    }

    fun assertDuration(expected: Long, result: JsonObject) {
        assertEquals(expected, result.getLong("duration"))
    }

    fun assertDisplayName(expected: String, result: JsonObject) {
        assertEquals(expected, result.getString("displayName"))
    }

    fun assertURL(expected: String, result: JsonObject) {
        assertEquals(expected, result.getString(CogboardConstants.PROP_URL))
    }

    fun assertTimestamp(expected: Long, result: JsonObject) {
        assertEquals(expected, result.getLong("timestamp"))
    }

    fun assertBranch(expected: String, result: JsonObject) {
        assertEquals(expected, result.getString("branch"))
    }
}