package com.cognifide.cogboard.widget.type.sonarqube.versions

import com.cognifide.cogboard.widget.type.sonarqube.Version
import io.vertx.core.json.JsonObject

class V7x : Version {

    override fun getMeasureKey() = "measures"
    override fun getMetricKey() = "metric"
    override fun getStatusValueKey() = "value"

    override fun getUrl(url: String, key: String, joinedMetrics: String): String {
        return "$url/api/measures/component?component=$key&metricKeys=alert_status,$joinedMetrics"
    }

    override fun getJson(responseBody: JsonObject): JsonObject {
        return (responseBody.getJsonObject("component") ?: JsonObject())
    }

    override fun getMetricValue(metric: JsonObject): Int {
        return metric.getString("value").toInt()
    }

    override fun getDashboardUrl(publicUrl: String, key: String, idNumber: Int): String {
        return "$publicUrl/dashboard?id=$key"
    }
}
