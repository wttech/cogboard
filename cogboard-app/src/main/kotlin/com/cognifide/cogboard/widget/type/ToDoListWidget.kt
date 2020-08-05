package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ToDoListWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    init {
        createDynamicChangeSubscriber()?.handler { send(it.body()) }
    }

    override fun updateState() {
        updateStateByCopingPropsToContent(PROPS)
    }

    companion object {
        val PROPS = setOf("toDoListItems", "isScrollable")
    }
}
