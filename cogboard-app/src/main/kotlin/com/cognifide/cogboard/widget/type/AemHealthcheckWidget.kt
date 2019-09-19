package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.Widget.Status.*
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class AemHealthcheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val selectedHealthChecks: JsonArray = config.getJsonArray("selectedHealthChecks")

    override fun handleResponse(responseBody: JsonObject) {
        val healthChecksResponse = getData(responseBody)
        val content = JsonObject()
        val status = attachHealthChecks(content, healthChecksResponse)

        send(JsonObject()
                .put(CogboardConstants.PROP_STATUS, status)
                .put(CogboardConstants.PROP_CONTENT, content))
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            httpGet(url = "$url/system/sling/monitoring/mbeans/org/apache/sling/healthcheck.2.json")
        } else {
            sendConfigurationError()
        }
    }

    private fun getData(responseBody: JsonObject): JsonObject {
        return responseBody.getJsonObject("HealthCheck") ?: JsonObject()
    }

    private fun attachHealthChecks(content: JsonObject, healthChecksResponse: JsonObject): Widget.Status {
        var widgetStatus = OK
        val result = JsonObject()
        content.put("healthChecks", result)

        selectedHealthChecks
                .stream()
                .map { it as String }
                .forEach { healthcheckName ->
                    healthChecksResponse.getJsonObject(healthcheckName)?.let {
                        val status = Widget.Status.from(it.getString(CogboardConstants.PROP_STATUS))
                        val url = "$publicUrl/$DETAILS_PATH/$healthcheckName"

                        if (status == FAIL) widgetStatus = FAIL
                        if (status == UNSTABLE && widgetStatus == OK) widgetStatus = UNSTABLE

                        result.put(healthcheckName, JsonObject()
                                .put(CogboardConstants.PROP_STATUS, status)
                                .put(CogboardConstants.PROP_URL, url)
                        )
                    }
                }
        return widgetStatus
    }

    companion object {
        const val DETAILS_PATH = "libs/granite/operations/content/healthreports/healthreport.html" +
                "/system/sling/monitoring/mbeans/org/apache/sling/healthcheck/HealthCheck"
    }
}