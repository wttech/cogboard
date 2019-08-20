package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.util.*
import kotlin.concurrent.timerTask

abstract class BaseWidget(val vertx: Vertx, val config: JsonObject) : Widget {

    override val id: String
        get() = config.getString(CogboardConstants.PROP_ID)

    override val type: String
        get() = config.getString(CogboardConstants.PROP_WIDGET_TYPE)

    val eventBusAddress: String
        get() = "event.widget.$id"

    val schedulePeriod: Long
        get() = config.getLong(CogboardConstants.PROP_SCHEDULE_PERIOD) ?: CogboardConstants.PROP_SCHEDULE_PERIOD_DEFAULT

    var task: TimerTask? = null

    /**
     * Attach all default values to config
     */
    init {
        CogboardConstants.DEFAULT_VALUES.forEach {
            if (!config.containsKey(it.key)) with(config) { put(it.key, it.value) }
        }
    }

    /**
     * Notifies Widget that it is time to update and `send(state: JsonObject)` new state
     */
    abstract override fun updateState()

    /**
     * sends given state on event bus, adds required `id`
     */
    override fun send(state: JsonObject) {
        state.put(CogboardConstants.PROP_ID, id)
        state.put(CogboardConstants.PROP_EVENT_TYPE, PROP_EVENT_TYPE_WIDGET_UPDATE)
        vertx.eventBus().send(CogboardConstants.EVENT_SEND_MESSAGE_TO_WEBSOCKET, state)
    }

    fun sendConfigurationError(message: String = "Fix configuration") {
        send(JsonObject()
                .put(CogboardConstants.PROP_STATUS, Widget.Status.ERROR_CONFIGURATION)
                .put(CogboardConstants.PROP_CONTENT,
                        JsonObject().put(CogboardConstants.PROP_ERROR_MESSAGE, message)
                )
        )
    }

    /**
     * Will start Schedule when schedulePeriod > 0, execute once otherwise
     */
    override fun start(): Widget {
        if (config.getBoolean(CogboardConstants.PROP_DISABLED) != true) {
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

    private fun startWithSchedule() {
        val period = config.getLong(CogboardConstants.PROP_SCHEDULE_PERIOD, 0L) * 1000 // to milliseconds

        if (period > 0L) {
            task = timerTask { updateState() }
            Timer().schedule(task, CogboardConstants.PROP_SCHEDULE_DELAY_DEFAULT, period)
        } else {
            updateState()
        }
    }

    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.PROP_ENDPOINT)?.getString(prop) ?: ""
    }

    companion object {
        const val PROP_EVENT_TYPE_WIDGET_UPDATE = "widget-update"
    }
}
