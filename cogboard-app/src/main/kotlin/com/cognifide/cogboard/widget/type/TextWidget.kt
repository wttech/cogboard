package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory

class TextWidget(verx: Vertx, config: JsonObject) : BaseWidget(verx, config) {

    override fun updateState() {
        send(JsonObject()
                .put(CogboardConstants.PROP_CONTENT, JsonObject().put(CogboardConstants.PROP_TEXT, config.getString("text", ""))))
        TextWidget.LOGGER.info("Widget update: id $id")
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(TextWidget::class.java)
    }

}