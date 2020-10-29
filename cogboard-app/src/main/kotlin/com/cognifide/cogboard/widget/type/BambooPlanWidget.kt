package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class BambooPlanWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val idString: String = config.getString("idString", "")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val results = responseBody.getJsonObject("results")

            if (results != null && results.getInteger("size") == 0) {
                sendNeverBuilt()
            } else if (results != null && results.getInteger("size") == 1) {
                sendSuccess(results)
            } else sendUnknownResponseError()
        }
    }

    private fun sendNeverBuilt() {
        send(JsonObject()
                .put(CC.PROP_ERROR_MESSAGE, "Never Built")
                .put(CC.PROP_ERROR_CAUSE, "")
                .put(CC.PROP_WIDGET_STATUS, Widget.Status.UNKNOWN))
    }

    private fun sendSuccess(results: JsonObject) {
        results.getJsonArray("result")?.first().let {
            val result = it as JsonObject

            result.put(CC.PROP_URL, extractUrl(result.getString("buildResultKey")))
                    .put(CC.PROP_WIDGET_STATUS, Widget.Status.from(result.getString("state")))

            send(result)
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && idString.isNotBlank()) {
            httpGet(url = "$url/rest/api/latest/result/$idString.json?max-results=1")
        } else {
            sendConfigurationError("Endpoint URL or ID is blank")
        }
    }

    private fun extractUrl(buildResultKey: String): String {
        return "$publicUrl/browse/$buildResultKey"
    }
}
