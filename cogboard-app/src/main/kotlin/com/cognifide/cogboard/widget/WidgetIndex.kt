package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.type.*
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class WidgetIndex {

    companion object {
        fun create(config: JsonObject, vertx: Vertx)  = when (config.getString(CogboardConstants.PROP_WIDGET_TYPE)) {
            ExampleWidget::class.java.simpleName -> ExampleWidget(vertx, config)
            JenkinsJobWidget::class.java.simpleName -> JenkinsJobWidget(vertx, config)
            SonarQubeWidget::class.java.simpleName -> SonarQubeWidget(vertx, config)
            ServiceCheckWidget::class.java.simpleName -> ServiceCheckWidget(vertx, config)
            BambooPlanWidget::class.java.simpleName -> BambooPlanWidget(vertx, config)
            // register Your widgets here
            else -> DefaultWidget.INSTANCE
        }
    }
}