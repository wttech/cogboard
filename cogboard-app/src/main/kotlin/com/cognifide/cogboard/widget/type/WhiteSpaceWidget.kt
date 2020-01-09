package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

/**
 * Use this for all widgets that don't require backend code
 */
class WhiteSpaceWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    override fun updateState() {
        send(JsonObject()
                .put(CogboardConstants.PROP_CONTENT, JsonObject()
                        .put(CogboardConstants.PROP_ERROR_MESSAGE, "")
                        .put(CogboardConstants.PROP_ERROR_CAUSE, "")
                        .put(CogboardConstants.PROP_STATUS, Widget.Status.UNKNOWN)))
    }
}
