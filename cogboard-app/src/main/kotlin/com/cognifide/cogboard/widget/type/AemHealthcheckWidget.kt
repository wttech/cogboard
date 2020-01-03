package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.Widget.Status.OK
import com.cognifide.cogboard.widget.Widget.Status.FAIL
import com.cognifide.cogboard.widget.Widget.Status.UNSTABLE
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class AemHealthcheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val selectedHealthChecks: JsonArray = config.getJsonArray("selectedHealthChecks")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            if (responseBody.containsKey("HealthCheck")) {
                sendSuccess(responseBody)
            } else sendConfigurationError(responseBody.getString(CogboardConstants.PROP_ERROR_CAUSE))
        }
    }

    private fun sendSuccess(responseBody: JsonObject) {
        val healthChecksResponse = getData(responseBody)
        val content = JsonObject()
        val status = attachHealthChecks(content, healthChecksResponse)

        content.put(CogboardConstants.PROP_WIDGET_STATUS, status)

        send(JsonObject()
                .put(CogboardConstants.PROP_CONTENT, content))
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            httpGet(url = "$url/system/sling/monitoring/mbeans/org/apache/sling/healthcheck.2.json")
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun getData(responseBody: JsonObject): JsonObject {
        return responseBody.getJsonObject("HealthCheck") ?: JsonObject()
    }

    private fun attachHealthChecks(content: JsonObject, healthChecksResponse: JsonObject): Widget.Status {
        var widgetStatus = OK
        val overviewUrl = "$publicUrl/$OVERVIEW_PATH"
        val result = JsonObject()
        content.put(CogboardConstants.PROP_ERROR_MESSAGE, "")
        content.put(CogboardConstants.PROP_URL, overviewUrl)
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
        const val OVERVIEW_PATH = "libs/granite/operations/content/healthreports/healthreportlist.html"
        const val DETAILS_PATH = "libs/granite/operations/content/healthreports/healthreport.html" +
                "/system/sling/monitoring/mbeans/org/apache/sling/healthcheck/HealthCheck"
    }
}
