package com.cognifide.cogboard.widget.type.sonarqube

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.http.auth.AuthenticationType
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class SonarQubeWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val key: String = config.getString("keyString", "")
    private val idNumber: Int = config.getInteger("idNumber", 0)
    private val selectedMetrics: JsonArray = config.getJsonArray("selectedMetrics")
    private val version: Version = Version.getVersion(config.getString("sonarQubeVersion", ""))

    override fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.TOKEN_AS_USERNAME, AuthenticationType.BASIC)
    }

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val data = getData(responseBody)
            if (data.containsKey(version.getMeasureKey())) {
                sendSuccess(data)
            } else sendUnknownResponseError()
        }
    }

    private fun sendSuccess(data: JsonObject) {
        data.getJsonArray(version.getMeasureKey())?.let {
            data.remove(version.getMeasureKey())
            val content = data.copy()

            attachMetrics(content, it)
            content.put(CogboardConstants.PROP_URL, version.getDashboardUrl(publicUrl, key, idNumber))
                    .put(CogboardConstants.PROP_WIDGET_STATUS, extractStatus(it))

            send(content)
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && key.isNotBlank()) {
            val joinedMetrics = selectedMetrics.joinToString(separator = ",")
            httpGet(url = version.getUrl(url, key, joinedMetrics))
        } else {
            sendConfigurationError("Endpoint URL or Key is blank.")
        }
    }

    private fun getData(responseBody: JsonObject): JsonObject {
        return version.getJson(responseBody)
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
                            .filter {
                                it.getString(version.getMetricKey()) != "alert_status" &&
                                        it.getString(version.getMetricKey()) == metricName
                            }
                            .findFirst()
                            .ifPresent { result.put(metricName, version.getMetricValue(it)) }
                }
    }

    private fun extractStatus(metrics: JsonArray): Widget.Status {
        return metrics.list
                .stream()
                .map { it as JsonObject }
                .filter { it.getString(version.getMetricKey()) == "alert_status" }
                .findFirst()
                .map { Widget.Status.from(it.getString(version.getStatusValueKey())) }
                .orElse(Widget.Status.UNKNOWN)
    }
}
