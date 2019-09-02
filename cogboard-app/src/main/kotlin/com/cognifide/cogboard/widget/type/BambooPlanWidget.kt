package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class BambooPlanWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val idString: String = config.getString("idString", "")

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.getJsonObject("results")?.getJsonArray("result")?.first().let {
            val result = it as JsonObject
            result.put(CogboardConstants.PROP_URL, extractUrl(it.getJsonObject("link")))

            send(JsonObject()
                    .put(CogboardConstants.PROP_ID, id)
                    .put(CogboardConstants.PROP_STATUS, Widget.Status.from(result.getString("state")))
                    .put(CogboardConstants.PROP_CONTENT, result))
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && idString.isNotBlank()) {
            httpGet(url = "$url/rest/api/latest/result/$idString.json?max-results=1")
        }
    }

    private fun extractUrl(linkData: JsonObject): String    {
        return linkData.getString("href", "")?.replace(url, publicUrl) ?: ""
    }

}