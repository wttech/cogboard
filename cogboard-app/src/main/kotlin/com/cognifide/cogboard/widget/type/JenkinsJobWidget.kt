package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class JenkinsJobWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val path: String = config.getString("path", "")
    private val url: String = config.endpointProp("url")
    private val publicUrl: String = config.endpointProp("publicUrl").ifBlank { url }

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.getJsonObject("lastBuild")?.let {
            val status = if (it.getBoolean("building", false)) Widget.Status.IN_PROGRESS
            else Widget.Status.from(it.getString("result", ""))
            it.put("branch", extractBranchInfo(it))
            it.put("url", makePublic(it.getString("url", "")))

            send(JsonObject()
                    .put(CogboardConstants.PROP_STATUS, status)
                    .put(CogboardConstants.PROP_CONTENT, it))
        }
    }

    private fun makePublic(privateUrl: String): String {
        return privateUrl.replace(url, publicUrl)
    }

    private fun extractBranchInfo(data: JsonObject): String {
        var branch = "unknown"
        data.getJsonArray("actions")
                ?.stream()
                ?.map { it as JsonObject }
                ?.filter { it.containsKey("lastBuiltRevision") }
                ?.findFirst()
                ?.ifPresent { action ->
                    action.getJsonObject("lastBuiltRevision")
                            .getJsonArray("branch")
                            ?.first().let { branch = (it as JsonObject).getString("name") }
                }
        return branch
    }

    override fun updateState() {
        if (url.isNotBlank() && path.isNotBlank()) {
            httpGet(url = "$url$path/api/json?tree=lastBuild[$LAST_BUILD_PROPS]")
        }
    }

    companion object {
        val LAST_BUILD_PROPS = setOf(
                "building",
                "description",
                "displayName",
                "duration",
                "estimatedDuration",
                "executor",
                "fullDisplayName",
                "id",
                "result",
                "timestamp",
                "url",
                "builtOn",
                "actions[lastBuiltRevision[branch[name]]]"
        ).joinToString(separator = ",")
    }
}