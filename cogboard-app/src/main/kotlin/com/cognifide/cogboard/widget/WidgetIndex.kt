package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.type.DefaultWidget
import com.cognifide.cogboard.widget.type.ExampleWidget
import com.cognifide.cogboard.widget.type.JenkinsJobWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class WidgetIndex {

    companion object {
        fun create(config: JsonObject, vertx: Vertx)  = when (config.getString(CogboardConstants.PROP_WIDGET_TYPE)) {
            ExampleWidget::class.java.simpleName -> ExampleWidget(vertx, config)
            JenkinsJobWidget::class.java.simpleName -> JenkinsJobWidget(vertx, config)
            // register Your widgets here
            else -> DefaultWidget.INSTANCE
        }
    }
}