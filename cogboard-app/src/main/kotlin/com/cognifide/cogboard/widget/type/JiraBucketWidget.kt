package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class JiraBucketWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val bucketQueries: JsonArray = config.getJsonArray("bucketQueries")
    private val bucketNames: JsonArray = JsonArray()
    private val issueCounts: JsonArray = JsonArray()

    override fun handleResponse(responseBody: JsonObject) {
        val response = JsonObject()
        val issues = responseBody.getJsonArray("issues").size()

        bucketNames.add(responseBody.getString("requestId"))
        issueCounts.add(issues)
        response.put("bucketNames", bucketNames)
        response.put("issueCounts", issueCounts)
        send(JsonObject()
                .put(CC.PROP_CONTENT, response))
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            for (bucketQuery in bucketQueries.list) {
                if (bucketQuery is JsonObject) {
                    val bucketName = bucketQuery.getString("bucketName")
                    val jqlQuery = bucketQuery.getString("jqlQuery")
                    httpGet(url = "$url/jira/rest/api/2/search?jql=$jqlQuery", requestId = bucketName)
                }
            }
        } else {
            sendConfigurationError("Endpoint URL or JQL query is blank.")
        }
    }
}
