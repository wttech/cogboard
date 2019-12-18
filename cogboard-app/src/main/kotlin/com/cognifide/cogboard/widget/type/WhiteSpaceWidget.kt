package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.Widget
import io.vertx.core.json.JsonObject

/**
 * Use this for all widgets that don't require backend code
 */
class WhiteSpaceWidget : Widget {

    override val id: String
        get() = "unknown"

    override val type: String
        get() = "WhiteSpaceWidget"

    override fun start(): Widget {
        return this
    }

    override fun stop(): Widget {
        return this
    }

    override fun send(state: JsonObject) {
        // do nothing
    }

    override fun updateState() {
        // do nothing
    }

    override fun config(): JsonObject {
        return JsonObject()
    }

    companion object {
        val INSTANCE = WhiteSpaceWidget()
    }
}
