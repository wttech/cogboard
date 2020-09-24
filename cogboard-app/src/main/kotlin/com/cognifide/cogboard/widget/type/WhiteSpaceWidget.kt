package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

/**
 * Use this for all widgets that don't require backend code
 */
class WhiteSpaceWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    override fun updateState() {
        send(JsonObject())
    }
}
