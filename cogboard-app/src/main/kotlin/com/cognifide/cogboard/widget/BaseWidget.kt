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

    val scheduleDelay: Long
        get() = config.getLong(CogboardConstants.PROP_SCHEDULE_DELAY)

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
        vertx.eventBus().send(CogboardConstants.EVENT_UPDATE_WIDGET_STATE, state)
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
        val period = config.getLong(CogboardConstants.PROP_SCHEDULE_PERIOD, 0L)
        val delay = config.getLong(CogboardConstants.PROP_SCHEDULE_DELAY, 0L)

        if (period > 0L) {
            task = timerTask { updateState() }
            Timer().schedule(task, delay, period)
        } else {
            updateState()
        }
    }

    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.PROP_ENDPOINT)?.getString(prop) ?: ""
    }
}
