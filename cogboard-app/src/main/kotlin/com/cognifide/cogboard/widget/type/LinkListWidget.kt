package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class LinkListWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    override fun updateState() {
        updateStateByCopingPropsToContent(PROPS)
    }

    companion object {
        val PROPS = setOf("linkListItems")
    }
}
