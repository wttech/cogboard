package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class JiraBucketWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val bucketQueries: JsonArray = config.getJsonArray("bucketQueries")

    private val buckets: JsonArray = prepareBuckets()

    private fun prepareBuckets(): JsonArray {
        val preparedBuckets = JsonArray()
        bucketQueries.forEach {
            if (it is JsonObject) {
                val bucket = JsonObject()
                bucket.put("id", it.getString("id"))
                bucket.put("name", it.getString("bucketName"))
                preparedBuckets.add(bucket)
            }
        }
        return preparedBuckets
    }

    override fun handleResponse(responseBody: JsonObject) {
        val response = JsonObject()
        val issues = responseBody.getJsonArray("issues").size()
        val bucketId = responseBody.getString("requestId")

        buckets.forEach {
            val key = (it as JsonObject).getString("id")
            if (bucketId == key) {
                it.put("issueCounts", issues)
            }
        }
        response.put("buckets", buckets)
        send(JsonObject()
                .put(CC.PROP_CONTENT, response))
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            for (bucketQuery in bucketQueries.list) {
                if (bucketQuery is JsonObject) {
                    val bucketId = bucketQuery.getString("id")
                    val jqlQuery = bucketQuery.getString("jqlQuery")
                    httpGet(url = "$url/jira/rest/api/2/search?jql=$jqlQuery&maxResults=500", requestId = bucketId)
                }
            }
        } else {
            sendConfigurationError("Endpoint URL or JQL query is blank.")
        }
    }
}
