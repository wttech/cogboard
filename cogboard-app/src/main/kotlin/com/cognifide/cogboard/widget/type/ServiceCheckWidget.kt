package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ServiceCheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val serviceUrl = config.getString("url", "")
    private val expectedStatusCode = config.getInteger("expectedStatusCode", 0)

    override fun updateState() {
       if (serviceUrl.isNotBlank()) httpGetStatus(serviceUrl) else sendConfigurationError("URL is blank")
    }

    override fun handleResponse(responseBody: JsonObject) {
        val statusCode = responseBody.getInteger("statusCode", 0)

        responseBody.put(CogboardConstants.PROP_URL, serviceUrl)
        responseBody.put("expectedStatusCode", expectedStatusCode)

        send(JsonObject()
                .put(CogboardConstants.PROP_ID, id)
                .put(CogboardConstants.PROP_STATUS, Widget.Status.compare(expectedStatusCode, statusCode))
                .put(CogboardConstants.PROP_CONTENT, responseBody))
    }
}