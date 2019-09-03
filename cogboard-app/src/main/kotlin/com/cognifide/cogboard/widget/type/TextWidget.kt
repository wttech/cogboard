package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_TEXT
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_TEXT_SIZE
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class TextWidget(verx: Vertx, config: JsonObject) : BaseWidget(verx, config) {

    override fun updateState() {
        val content = JsonObject()
                .put(PROP_TEXT, config.getString(PROP_TEXT, ""))
                .put(PROP_TEXT_SIZE, config.getString(PROP_TEXT_SIZE, ""))

        send(JsonObject()
                .put(CogboardConstants.PROP_CONTENT, content))
    }
}