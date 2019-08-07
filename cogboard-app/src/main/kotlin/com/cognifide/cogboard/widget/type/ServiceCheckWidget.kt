package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.util.*

class ServiceCheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val path: String = config.getString("path", "")

    override fun updateState() {
        httpGetStatus(path)
    }

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.put("timestamp", Date().time)

        send(JsonObject()
                .put(CogboardConstants.PROP_ID, id)
                .put(CogboardConstants.PROP_STATUS, Widget.Status.from(responseBody.getInteger("statusCode", 0)))
                .put(CogboardConstants.PROP_CONTENT, responseBody))
    }
}