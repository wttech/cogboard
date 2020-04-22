package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class JiraBucketWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val bucketQueries: JsonArray = config.getJsonArray("bucketQueries")
    private val buckets: JsonArray = JsonArray()

    override fun handleResponse(responseBody: JsonObject) {
        val response = JsonObject()
        val issues = responseBody.getJsonArray("issues")

        if (issues != null) {
            buckets.add(issues)
            response.put("buckets", buckets)
            send(JsonObject()
                    .put(CC.PROP_CONTENT, response))
        } else sendUnknownResponseError()
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            for (bucketQuery in bucketQueries.list) {
                httpGet(url = "$url/jira/rest/api/2/search?jql=$bucketQuery", requestId = bucketQuery.toString())
            }
        } else {
            sendConfigurationError("Endpoint URL or JQL query is blank.")
        }
    }
}
