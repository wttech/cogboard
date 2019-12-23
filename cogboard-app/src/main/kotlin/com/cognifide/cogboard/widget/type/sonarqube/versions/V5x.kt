package com.cognifide.cogboard.widget.type.sonarqube.versions

import com.cognifide.cogboard.widget.type.sonarqube.Version
import io.vertx.core.json.JsonObject

class V5x : Version {

    override fun getMeasureKey() = "msr"
    override fun getMetricKey() = "key"
    override fun getStatusValueKey() = "data"

    override fun getUrl(url: String, key: String, joinedMetrics: String): String {
        return "$url/api/resources?resource=$key&metrics=alert_status,$joinedMetrics"
    }

    override fun getJson(responseBody: JsonObject): JsonObject {
        return (responseBody.getJsonArray("array")?.list?.get(0) ?: JsonObject()) as JsonObject
    }

    override fun getMetricValue(metric: JsonObject): Int {
        return metric.getInteger("val")
    }

    override fun getDashboardUrl(publicUrl: String, key: String, idNumber: Int): String {
        return "$publicUrl/dashboard/index/$idNumber"
    }
}
