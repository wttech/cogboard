package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class JiraBucketsWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val bucketQueries: JsonArray = config.getJsonArray(CC.PROP_BUCKET_QUERIES)
    private val buckets: JsonArray = JsonArray()

    init {
        bucketQueries.forEach {
            if (it is JsonObject) {
                buckets.add(JsonObject()
                        .put(CC.PROP_ID, it.getString(CC.PROP_ID))
                        .put(CC.PROP_NAME, it.getString(CC.PROP_BUCKET_NAME))
                        .put(CC.PROP_URL, createBucketUrl(it)))
            }
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        val issues = responseBody.getJsonArray("issues")
        val bucketId = responseBody.getString(CC.PROP_REQUEST_ID)

        (buckets.first { compareId(bucketId, it) } as JsonObject)
                .put("issueCounts", issues?.size() ?: "Error")
        send(JsonObject()
                .put(CC.PROP_CONTENT, JsonObject().put("buckets", buckets)))
    }

    private fun createBucketUrl(bucket: JsonObject) =
            "${url}jira/issues/?jql=${bucket.getString(CC.PROP_JQL_QUERY)}&maxResults=${config.getInteger(CC.PROP_ISSUE_LIMIT)}"

    private fun compareId(bucketId: String?, it: Any?) = bucketId == (it as JsonObject).getString(CC.PROP_ID)

    override fun updateState() {
        if (url.isNotBlank()) {
            for (bucketQuery in bucketQueries.list) {
                if (bucketQuery is JsonObject) {
                    val bucketId = bucketQuery.getString(CC.PROP_ID)
                    val jqlQuery = bucketQuery.getString(CC.PROP_JQL_QUERY)
                    val issueLimit = config.getInteger(CC.PROP_ISSUE_LIMIT)
                    httpGet(url = "$url/jira/rest/api/2/search/?jql=$jqlQuery&maxResults=$issueLimit", requestId = bucketId)
                }
            }
        } else {
            sendConfigurationError("Endpoint URL is blank.")
        }
    }
}
