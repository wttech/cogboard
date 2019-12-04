package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class SonarQubeWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val key: String = config.getString("keyString", "")
    private val idNumber: Int = config.getInteger("idNumber", 0)
    private val selectedMetrics: JsonArray = config.getJsonArray("selectedMetrics")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val data = getData(responseBody)
            if (data.containsKey("msr")) {
                sendSuccess(data)
            } else sendUnknownResponseError()
        }
    }

    private fun sendSuccess(data: JsonObject) {
        data.getJsonArray("msr")?.let {
            data.remove("msr")
            val content = data.copy()

            attachMetrics(content, it)
            content.put(CogboardConstants.PROP_URL, "$publicUrl/dashboard/index/$idNumber")
                    .put(CogboardConstants.PROP_WIDGET_STATUS, extractStatus(it))

            content.clearErrorMessageAndErrorCause()

            send(JsonObject()
                    .put(CogboardConstants.PROP_CONTENT, content))
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && key.isNotBlank()) {
            val joinedMetrics = selectedMetrics.joinToString(separator = ",")
            httpGet(url = "$url/api/resources?resource=$key&metrics=alert_status,$joinedMetrics")
        } else {
            sendConfigurationError("Endpoint URL or Key is blank.")
        }
    }

    private fun getData(responseBody: JsonObject): JsonObject {
        val data = responseBody.getJsonArray("array")?.list?.get(0) ?: JsonObject()
        return data as JsonObject
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
}
