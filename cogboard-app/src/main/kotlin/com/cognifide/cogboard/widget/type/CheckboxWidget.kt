package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Handler
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class CheckboxWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    init {
        createDynamicChangeSubscriber(Handler { send(it.body()) })
    }

    override fun updateState() {
        // noop, everything is handled in content
    }
}
