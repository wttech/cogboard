package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class PersonDrawWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    init {
        super.config.put(CogboardConstants.PROP_SCHEDULE_PERIOD, 1L)
    }

    override fun updateState() {
        updateStateByCopingPropsToContent(PROPS)
    }

    companion object {
        val PROPS = setOf("randomizeCheckbox", "personDrawInterval", "personDrawDailySwitch", "multiTextInput")
    }
}
