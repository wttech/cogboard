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
import com.cognifide.cogboard.CogboardConstants as CC

/**
 * Base widget class for extending - use this class if your new widget needs to do some computations on backend.
 * This widget is meant for tasks that are not requesting 3rd party endpoints.
 */
abstract class BaseWidget(
    val vertx: Vertx,
    val config: JsonObject,
    private var boardService: BoardsConfigService = BoardsConfigService()
) : Widget {

    override val id: String
        get() = config.getString(CC.PROP_ID)

    override val type: String
        get() = config.getString(CC.PROP_WIDGET_TYPE)

    val eventBusAddress: String
        get() = "event.widget.$id"

    val schedulePeriod: Long
        get() = config.getLong(CC.PROP_SCHEDULE_PERIOD) ?: CC.PROP_SCHEDULE_PERIOD_DEFAULT

    var task: TimerTask? = null

    /**
     * Attach all default values to config
     */
    init {
        CC.DEFAULT_VALUES.forEach {
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
    override fun send(state: JsonObject) {
        state.put(CC.PROP_ID, id)
        state.put(CC.PROP_EVENT_TYPE, PROP_EVENT_TYPE_WIDGET_UPDATE)
        state.getJsonObject(CC.PROP_CONTENT).attachUpdateDate()
        boardService.saveContent(id, state.getJsonObject(CC.PROP_CONTENT))
        vertx.eventBus().send(CC.EVENT_SEND_MESSAGE_TO_WEBSOCKET, state)
    }

    /**
     * Use this method for sending configuration error back to user
     */
    fun sendConfigurationError(cause: String = "") {
        send(JsonObject()
                .put(CC.PROP_CONTENT,
                        JsonObject()
                                .put(CC.PROP_ERROR_MESSAGE, "Configuration Error")
                                .put(CC.PROP_ERROR_CAUSE, cause)
                                .put(CC.PROP_WIDGET_STATUS, Widget.Status.ERROR_CONFIGURATION)
                )
        )
    }

    fun sendUnknownResponseError() {
        sendConfigurationError("Unknown Response")
    }

    fun checkAuthorized(responseBody: JsonObject): Boolean {
        val statusCode = responseBody.getInteger(CC.PROP_STATUS_CODE, CC.STATUS_CODE_200)
        return if (statusCode == CC.STATUS_CODE_401) {
            sendConfigurationError("Unauthorized")
            false
        } else true
    }

    /**
     * Will start Schedule when schedulePeriod > 0, execute once otherwise
     */
    override fun start(): Widget {
        if (config.getBoolean(CC.PROP_DISABLED) != true) {
            startWithSchedule()
        }
        return this
    }

    /**
     * Will stop scheduled task from `start` method
     */
    override fun stop(): Widget {
        task?.cancel()
        return this
    }

    override fun config(): JsonObject {
        return config
    }

    protected fun createDynamicChangeSubscriber(): MessageConsumer<JsonObject> {
        return vertx
            .eventBus()
            .consumer<JsonObject>(WidgetRuntimeService.createWidgetContentUpdateAddress(id))
    }

    protected fun updateStateByCopingPropsToContent(props: Set<String>) {
        val content = JsonObject()
        props.forEach {
            content.put(it, config.getValue(it))
        }
        send(JsonObject().put(CC.PROP_CONTENT, content))
    }

    private fun startWithSchedule() {
        if (schedulePeriod > 0L) {
            task = timerTask { updateState() }
            Timer().schedule(task, CC.PROP_SCHEDULE_DELAY_DEFAULT, schedulePeriod * TO_SECONDS)
        } else {
            updateState()
        }
    }

    private fun JsonObject.attachUpdateDate() {
        this.put(CC.PROP_LAST_UPDATED, Date().time)
    }

    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CC.PROP_ENDPOINT)?.getString(prop) ?: ""
    }

    protected fun JsonObject.clearErrorMessageAndErrorCause() {
        map[CC.PROP_ERROR_MESSAGE] = ""
        map[CC.PROP_ERROR_CAUSE] = ""
    }

    companion object {
        const val PROP_EVENT_TYPE_WIDGET_UPDATE = "widget-update"
        const val TO_SECONDS = 1000
    }
}
