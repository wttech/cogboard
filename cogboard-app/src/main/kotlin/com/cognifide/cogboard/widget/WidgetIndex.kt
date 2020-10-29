package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.type.AemHealthcheckWidget
import com.cognifide.cogboard.widget.type.BambooDeploymentWidget
import com.cognifide.cogboard.widget.type.BambooPlanWidget
import com.cognifide.cogboard.widget.type.CheckboxWidget
import com.cognifide.cogboard.widget.type.WhiteSpaceWidget
import com.cognifide.cogboard.widget.type.IframeEmbedWidget
import com.cognifide.cogboard.widget.type.JenkinsJobWidget
import com.cognifide.cogboard.widget.type.LinkListWidget
import com.cognifide.cogboard.widget.type.randompicker.RandomPickerWidget
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.sonarqube.SonarQubeWidget
import com.cognifide.cogboard.widget.type.TextWidget
import com.cognifide.cogboard.widget.type.ToDoListWidget
import com.cognifide.cogboard.widget.type.JiraBucketsWidget
import com.cognifide.cogboard.widget.type.WorldClockWidget
import com.cognifide.cogboard.widget.type.AemBundleInfoWidget
import com.cognifide.cogboard.widget.type.zabbix.ZabbixWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class WidgetIndex {

    companion object {

        /**
         * Register new widget here - key will be used by client as a human friendly widget name
         */
        private val AVAILABLE_WIDGETS = sortedMapOf(
                "Aem Bundle Info Widget" to AemBundleInfoWidget::class.java,
                "Aem Health-check Widget" to AemHealthcheckWidget::class.java,
                "Checkbox Widget" to CheckboxWidget::class.java,
                "Iframe Embed Widget" to IframeEmbedWidget::class.java,
                "Link List Widget" to LinkListWidget::class.java,
                "Random Picker Widget" to RandomPickerWidget::class.java,
                "Text Widget" to TextWidget::class.java,
                "ToDo List Widget" to ToDoListWidget::class.java,
                "World Clock Widget" to WorldClockWidget::class.java,
                "Zabbix Widget" to ZabbixWidget::class.java,
                "Bamboo Deployment Widget" to BambooDeploymentWidget::class.java,
                "Bamboo Plan Widget" to BambooPlanWidget::class.java,
                "Jenkins Job Widget" to JenkinsJobWidget::class.java,
                "Jira Buckets Widget" to JiraBucketsWidget::class.java,
                "Service Check Widget" to ServiceCheckWidget::class.java,
                "Sonar Qube Widget" to SonarQubeWidget::class.java,
                "White Space Widget" to WhiteSpaceWidget::class.java
        )

        fun availableWidgets(): JsonObject {
            val widgetsJson = JsonObject()
            AVAILABLE_WIDGETS.forEach {
                widgetsJson.put(it.key, it.value.simpleName)
            }
            return widgetsJson
        }

        /**
         * @return new widget instance or default widget instance for all widgets that don't require any backend logic.
         */
        fun create(config: JsonObject, vertx: Vertx): BaseWidget {
            val typeName = config.getString(CogboardConstants.PROP_WIDGET_TYPE)
            val widgetType = AVAILABLE_WIDGETS
                    .values
                    .stream()
                    .filter { it.simpleName == typeName }
                    .findFirst()
                    .orElse(WhiteSpaceWidget::class.java)

            return widgetType.constructors[0].newInstance(vertx, config, BoardsConfigService()) as BaseWidget
        }
    }
}
