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
        val totalIssues = responseBody.getInteger("total")
        val bucketId = responseBody.getString(CC.PROP_REQUEST_ID)

        (buckets.first { compareId(bucketId, it) } as JsonObject)
                .put("issueCounts", totalIssues ?: "Error")

        send(JsonObject().put("buckets", buckets))
    }

    private fun createBucketUrl(bucket: JsonObject) =
            "${url}jira/issues/?jql=${bucket.getString(CC.PROP_JQL_QUERY)}&maxResults=0"

    private fun compareId(bucketId: String?, it: Any?) = bucketId == (it as JsonObject).getString(CC.PROP_ID)

    override fun updateState() {
        if (url.isNotBlank()) {
            bucketQueries.list.forEach { bucketQuery ->
                if (bucketQuery is JsonObject) {
                    val bucketId = bucketQuery.getString(CC.PROP_ID)
                    val jqlQuery = bucketQuery.getString(CC.PROP_JQL_QUERY)
                    httpGet(url = "$url/jira/rest/api/2/search/?jql=$jqlQuery&maxResults=0",
                            requestId = bucketId)
                }
            }
        } else {
            sendConfigurationError("Endpoint URL is blank.")
        }
    }
}
