package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class BambooPlanWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val idString: String = config.getString("idString", "")

    override fun handleResponse(responseBody: JsonObject) {
        val results = responseBody.getJsonObject("results")

        if (results != null && results.getInteger("size") == 0) {
            send(JsonObject()
                    .put(CogboardConstants.PROP_STATUS, Widget.Status.UNKNOWN)
                    .put(CogboardConstants.PROP_CONTENT, JsonObject()
                            .put(CogboardConstants.PROP_ERROR_MESSAGE, "Never Built")))
        } else if (results != null && results.getInteger("size") == 1) {
            results.getJsonArray("result")?.first().let {
                val result = it as JsonObject
                result.put(CogboardConstants.PROP_ERROR_MESSAGE, "")
                result.put(CogboardConstants.PROP_URL, extractUrl(it.getString("buildResultKey")))

                send(JsonObject()
                        .put(CogboardConstants.PROP_STATUS, Widget.Status.from(result.getString("state")))
                        .put(CogboardConstants.PROP_CONTENT, result))
            }
        } else {
            sendConfigurationError("Config error: Wrong response.")
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && idString.isNotBlank()) {
            httpGet(url = "$url/rest/api/latest/result/$idString.json?max-results=1")
        } else {
            sendConfigurationError("Config error: Endpoint URL or ID is blank.")
        }
    }

    private fun extractUrl(buildResultKey: String): String {
        return "$publicUrl/browse/$buildResultKey"
    }

}