package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class WorldClockWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    override fun updateState() {
        val content = propsToContent(PROPS)
        send(content)
    }

    companion object {
        val PROPS = setOf("timeZoneId", "dateFormat", "timeFormat", "displayDate", "displayTime", "textSize")
    }
}
