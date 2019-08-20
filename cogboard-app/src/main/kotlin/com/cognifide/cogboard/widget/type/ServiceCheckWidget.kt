package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.util.*

class ServiceCheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val url = config.getString("url", "")
    private val expectedStatusCode = config.getInteger("expectedStatusCode", 0)

    override fun updateState() {
       if (url.isNotBlank()) httpGetStatus(url) else sendConfigurationError("URL is blank")
    }

    override fun handleResponse(responseBody: JsonObject) {
        val statusCode = responseBody.getInteger("statusCode", 0)

        responseBody.put("timestamp", Date().time)
        responseBody.put(CogboardConstants.PROP_URL, url)
        responseBody.put("expectedStatusCode", expectedStatusCode)

        send(JsonObject()
                .put(CogboardConstants.PROP_ID, id)
                .put(CogboardConstants.PROP_STATUS, Widget.Status.compare(expectedStatusCode, statusCode))
                .put(CogboardConstants.PROP_CONTENT, responseBody))
    }
}