package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants as CC
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.VolumeStorageFactory.appConfig
import com.cognifide.cogboard.widget.type.AemBundleInfoWidget
import com.cognifide.cogboard.widget.type.AemHealthcheckWidget
import com.cognifide.cogboard.widget.type.BambooDeploymentWidget
import com.cognifide.cogboard.widget.type.BambooPlanWidget
import com.cognifide.cogboard.widget.type.CheckboxWidget
import com.cognifide.cogboard.widget.type.IframeEmbedWidget
import com.cognifide.cogboard.widget.type.JenkinsJobWidget
import com.cognifide.cogboard.widget.type.JiraBucketsWidget
import com.cognifide.cogboard.widget.type.LinkListWidget
import com.cognifide.cogboard.widget.type.WhiteSpaceWidget
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.TextWidget
import com.cognifide.cogboard.widget.type.ToDoListWidget
import com.cognifide.cogboard.widget.type.WorldClockWidget
import com.cognifide.cogboard.widget.type.randompicker.RandomPickerWidget
import com.cognifide.cogboard.widget.type.sonarqube.SonarQubeWidget
import com.cognifide.cogboard.widget.type.zabbix.ZabbixWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class WidgetIndex {

    companion object {

        /**
         * Register new widget here - key will be used by client as a human friendly widget name
         */
        private val AVAILABLE_WIDGETS = sortedMapOf(
                "Aem Bundle Info" to AemBundleInfoWidget::class.java,
                "Aem Healthcheck" to AemHealthcheckWidget::class.java,
                "Checkbox" to CheckboxWidget::class.java,
                "Iframe Embed" to IframeEmbedWidget::class.java,
                "Link List" to LinkListWidget::class.java,
                "Random Picker" to RandomPickerWidget::class.java,
                "Text" to TextWidget::class.java,
                "ToDo List" to ToDoListWidget::class.java,
                "World Clock" to WorldClockWidget::class.java,
                "Zabbix" to ZabbixWidget::class.java,
                "Bamboo Deployment" to BambooDeploymentWidget::class.java,
                "Bamboo Plan" to BambooPlanWidget::class.java,
                "Jenkins Job" to JenkinsJobWidget::class.java,
                "Jira Buckets" to JiraBucketsWidget::class.java,
                "Service Check" to ServiceCheckWidget::class.java,
                "SonarQube" to SonarQubeWidget::class.java,
                "White Space" to WhiteSpaceWidget::class.java
        )

        fun availableWidgets(): JsonArray {
            val excludedWidgets = appConfig().loadConfig().getJsonArray("excludedWidgets") ?: JsonArray()
            val widgetsJson = JsonArray()
            AVAILABLE_WIDGETS
                    .entries
                    .stream()
                    .filter { !excludedWidgets.contains(it.key) }
                    .forEach {
                        widgetsJson.add(JsonObject()
                                .put(CC.PROP_VALUE, it.value.simpleName)
                                .put(CC.PROP_DISPLAY, it.key))
                    }
            return widgetsJson
        }

        /**
         * @return new widget instance or default widget instance for all widgets that don't require any backend logic.
         */
        fun create(config: JsonObject, vertx: Vertx): BaseWidget {
            val typeName = config.getString(CC.PROP_WIDGET_TYPE)
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
