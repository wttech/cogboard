package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.type.AemHealthcheckWidget
import com.cognifide.cogboard.widget.type.BambooDeploymentWidget
import com.cognifide.cogboard.widget.type.BambooPlanWidget
import com.cognifide.cogboard.widget.type.CheckboxWidget
import com.cognifide.cogboard.widget.type.WhiteSpaceWidget
import com.cognifide.cogboard.widget.type.ExampleWidget
import com.cognifide.cogboard.widget.type.IframeEmbedWidget
import com.cognifide.cogboard.widget.type.JenkinsJobWidget
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.sonarqube.SonarQubeWidget
import com.cognifide.cogboard.widget.type.TextWidget
import com.cognifide.cogboard.widget.type.WorldClockWidget
import com.cognifide.cogboard.widget.type.AemBundleInfoWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class WidgetIndex {

    companion object {
        /**
         * If your widget need to do some calculations or requests from the backend register it here.
         * If widget does not do anything on backend no changes on backend are required.
         * @return new widget instance or default widget instance for all widgets that don't require any backend logic.
         */
        fun create(config: JsonObject, vertx: Vertx) = when (config.getString(CogboardConstants.PROP_WIDGET_TYPE)) {
            ExampleWidget::class.java.simpleName -> ExampleWidget(vertx, config)
            JenkinsJobWidget::class.java.simpleName -> JenkinsJobWidget(vertx, config)
            SonarQubeWidget::class.java.simpleName -> SonarQubeWidget(vertx, config)
            ServiceCheckWidget::class.java.simpleName -> ServiceCheckWidget(vertx, config)
            BambooDeploymentWidget::class.java.simpleName -> BambooDeploymentWidget(vertx, config)
            BambooPlanWidget::class.java.simpleName -> BambooPlanWidget(vertx, config)
            AemHealthcheckWidget::class.java.simpleName -> AemHealthcheckWidget(vertx, config)
            TextWidget::class.java.simpleName -> TextWidget(vertx, config)
            IframeEmbedWidget::class.java.simpleName -> IframeEmbedWidget(vertx, config)
            WorldClockWidget::class.java.simpleName -> WorldClockWidget(vertx, config)
            CheckboxWidget::class.java.simpleName -> CheckboxWidget(vertx, config)
            AemBundleInfoWidget::class.java.simpleName -> AemBundleInfoWidget(vertx, config)
            // add here
            else -> WhiteSpaceWidget.INSTANCE
        }
    }
}
