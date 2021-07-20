package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants.Props
class JiraBucketsWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val bucketQueries: JsonArray = config.getJsonArray(Props.BUCKET_QUERIES)
    private val buckets: JsonArray = JsonArray()

    init {
        bucketQueries.forEach {
            if (it is JsonObject) {
                buckets.add(JsonObject()
                        .put(Props.ID, it.getString(Props.ID))
                        .put(Props.NAME, it.getString(Props.BUCKET_NAME))
                        .put(Props.ERROR_THRESHOLD, it.getString(Props.ERROR_THRESHOLD))
                        .put(Props.WARNING_THRESHOLD, it.getString(Props.WARNING_THRESHOLD))
                        .put(Props.URL, createBucketUrl(it)))
            }
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        val totalIssues = responseBody.getInteger("total")
        val bucketId = responseBody.getString(Props.REQUEST_ID)

        (buckets.first { compareId(bucketId, it) } as JsonObject)
                .put("issueCounts", totalIssues ?: "Error")

        send(JsonObject().put("buckets", buckets))
    }

    private fun createBucketUrl(bucket: JsonObject) =
            "${url}jira/issues/?jql=${bucket.getString(Props.JQL_QUERY)}&maxResults=0"

    private fun compareId(bucketId: String?, it: Any?) = bucketId == (it as JsonObject).getString(Props.ID)

    override fun updateState() {
        if (url.isNotBlank()) {
            bucketQueries.list.forEach { bucketQuery ->
                if (bucketQuery is JsonObject) {
                    val bucketId = bucketQuery.getString(Props.ID)
                    val jqlQuery = bucketQuery.getString(Props.JQL_QUERY)
                    httpGet(url = "$url/jira/rest/api/2/search/?jql=$jqlQuery&maxResults=0",
                            requestId = bucketId)
                }
            }
        } else {
            sendConfigurationError("Endpoint URL is blank.")
        }
    }
}
