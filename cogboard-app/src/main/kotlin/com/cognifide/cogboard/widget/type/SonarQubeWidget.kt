package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

/**
 * Example response
{
"_class": "hudson.maven.MavenModuleSet",
"lastBuild": {
"_class": "hudson.maven.MavenModuleSetBuild",
"building": false,
"description": null,
"displayName": "#1071",
"duration": 480621,
"estimatedDuration": 443093,
"executor": null,
"fullDisplayName": "Project » build-name #1017",
"id": "1071",
"result": "SUCCESS",
"timestamp": 1564457216813,
"url": "http://server.com/job/Project/job/build-name/1071/",
"builtOn": "QA-Automation-Win7-64bit-10"
}
}
 */
class SonarQubeWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val idNumber: Int = config.getInteger("idNumber", 0)
    private val key: String = config.getString("key") ?: ""
    private val selectedMetrics: JsonArray = config.getJsonArray("selectedMetrics")
    private val url: String = config.endpointProp("url")

    override fun handleResponse(responseBody: JsonObject) {
        val data = getData(responseBody)
        val metrics: JsonArray = data.remove("msr") as JsonArray
        val content = data.copy()

        attachMetrics(content, metrics)
        content.put(CogboardConstants.PROP_URL, "$url/dashboard/index/$idNumber")

        send(JsonObject()
                .put(CogboardConstants.PROP_ID, id)
                .put(CogboardConstants.PROP_STATUS, extractStatus(metrics))
                .put(CogboardConstants.PROP_CONTENT, content))
    }

    private fun getData(responseBody: JsonObject): JsonObject {
        return responseBody.getJsonArray("array").list[0] as JsonObject
    }

    private fun attachMetrics(content: JsonObject, metrics: JsonArray) {
        val result = JsonObject()
        content.put("metrics", result)
        selectedMetrics
                .stream()
                .map { it as String }
                .forEach { metricName ->
                    metrics.list
                            .stream()
                            .map { it as JsonObject }
                            .filter { it.getString("key") != "alert_status" && it.getString("key") == metricName }
                            .findFirst()
                            .ifPresent { result.put(metricName, it.getDouble("val")?.toInt()) }
                }
    }

    private fun extractStatus(metrics: JsonArray): Widget.Status {
        return metrics.list
                .stream()
                .map { it as JsonObject }
                .filter { it.getString("key") == "alert_status" }
                .findFirst()
                .map { Widget.Status.from(it.getString("data")) }
                .orElse(Widget.Status.UNKNOWN)
    }

    override fun updateState() {
        if (url.isNotBlank() && key.isNotBlank()) {
            httpGet(url = "$url/api/resources?resource=$key&metrics=alert_status,${selectedMetrics.joinToString(separator = ",")}")
        }
    }
}