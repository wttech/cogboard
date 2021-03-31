package com.cognifide.cogboard.widget

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.config.service.WidgetRuntimeService
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import java.util.Date
import java.util.Timer
import java.util.TimerTask
import kotlin.concurrent.timerTask
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.EventType
import com.cognifide.cogboard.CogboardConstants.StatusCode
import com.cognifide.cogboard.CogboardConstants.Companion.DEFAULT_VALUES

/**
 * Base widget class for extending - use this class if your new widget needs to do some computations on backend.
 * This widget is meant for tasks that are not requesting 3rd party endpoints.
 */
abstract class BaseWidget(
    val vertx: Vertx,
    val config: JsonObject,
    protected var boardService: BoardsConfigService
) : Widget {

    private var consumer: MessageConsumer<JsonObject>? = null

    override val id: String
        get() = config.getString(Props.ID)

    override val type: String
        get() = config.getString(Props.WIDGET_TYPE)

    val eventBusAddress: String
        get() = "event.widget.$id"

    val schedulePeriod: Long
        get() = config.getLong(Props.SCHEDULE_PERIOD) ?: Props.SCHEDULE_PERIOD_DEFAULT

    var task: TimerTask? = null

    /**
     * Attach all default values to config
     */
    init {
        DEFAULT_VALUES.forEach {
            if (!config.containsKey(it.key)) with(config) { put(it.key, it.value) }
        }
    }

    /**
     * This method will be executed each time when widget needs to be updated.
     * When implementing this method execute your business logic, create state object and lastly use `send` method
     */
    abstract override fun updateState()

    /**
     * Use this method for sending widget updated to user.
     * This method will add some required fields for you: `id`, `eventType`
     */
    override fun send(state: Any, dontWrap: Boolean) {
        val data = if (dontWrap && state is JsonObject) state
        else JsonObject().put(Props.CONTENT, state)

        data.put(Props.ID, id)
        data.put(Props.EVENT_TYPE, EventType.WIDGET_UPDATE)
        data.getJsonObject(Props.CONTENT).attachUpdateDate()
        boardService.saveContent(id, data.getJsonObject(Props.CONTENT))
        vertx.eventBus().send(Event.SEND_MESSAGE_TO_WEBSOCKET, data)
    }

    /**
     * Use this method for sending configuration error back to user
     */
    fun sendConfigurationError(cause: String = "") {
        send(JsonObject()
                .put(Props.ERROR_MESSAGE, "Configuration Error")
                .put(Props.ERROR_CAUSE, cause)
                .put(Props.WIDGET_STATUS, Widget.Status.ERROR_CONFIGURATION)
        )
    }

    fun sendUnknownResponseError() {
        sendConfigurationError("Unknown Response")
    }

    fun checkAuthorized(responseBody: JsonObject): Boolean {
        val statusCode = responseBody.getInteger(Props.STATUS_CODE, StatusCode.`200`)
        return if (statusCode == StatusCode.`401`) {
            sendConfigurationError("Unauthorized")
            false
        } else true
    }

    /**
     * Will start Schedule when schedulePeriod > 0, execute once otherwise
     */
    override fun start(): Widget {
        if (config.getBoolean(Props.DISABLED) != true) {
            startWithSchedule()
        }
        return this
    }

    /**
     * Will stop scheduled task from `start` method
     */
    override fun stop(): Widget {
        consumer?.unregister()
        task?.cancel()
        return this
    }

    override fun config(): JsonObject {
        return config
    }

    protected fun createDynamicChangeSubscriber(): MessageConsumer<JsonObject>? {
        consumer = vertx.eventBus()
                .consumer<JsonObject>(WidgetRuntimeService.createWidgetContentUpdateAddress(id))

        return consumer
    }

    protected fun updateStateByCopingPropsToContent(props: Set<String>) {
        val content = JsonObject()
        props.forEach {
            content.put(it, config.getValue(it))
        }
        send(content)
    }

    private fun startWithSchedule() {
        if (schedulePeriod > 0L) {
            task = timerTask { updateState() }
            Timer().schedule(task, Props.SCHEDULE_DELAY_DEFAULT, schedulePeriod * TO_SECONDS)
        } else {
            updateState()
        }
    }

    private fun JsonObject.attachUpdateDate() {
        this.put(Props.LAST_UPDATED, Date().time)
    }

    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(Props.ENDPOINT_LOADED)?.getString(prop) ?: ""
    }

    companion object {
        const val TO_SECONDS = 1000
    }
}
