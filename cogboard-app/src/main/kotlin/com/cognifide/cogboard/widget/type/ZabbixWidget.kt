package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ZabbixWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val selectedMetrics: String = config.getString("selectedZabbixMetric", "")

    override fun updateState() {
        println(selectedMetrics)
        TODO("Not yet implemented")
    }

    override fun handleResponse(responseBody: JsonObject) {
        TODO("Not yet implemented")
    }
}
