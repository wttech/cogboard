package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class JenkinsJobWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val path: String = config.getString("path", "")

    override fun handleResponse(responseBody: JsonObject) {
        val lastBuild = responseBody.getJsonObject("lastBuild")

        if (lastBuild != null) {
            val status = if (lastBuild.getBoolean("building", false)) Widget.Status.IN_PROGRESS
            else Widget.Status.from(lastBuild.getString("result", ""))
            lastBuild.put(CogboardConstants.PROP_ERROR_MESSAGE, "")
            lastBuild.put("branch", extractBranchInfo(lastBuild))
            lastBuild.put(CogboardConstants.PROP_URL, makePublic(lastBuild.getString(CogboardConstants.PROP_URL, "")))

            send(JsonObject()
                    .put(CogboardConstants.PROP_STATUS, status)
                    .put(CogboardConstants.PROP_CONTENT, lastBuild))
        } else {
            sendConfigurationError("Config error: Wrong response.")
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
                .replaceFirst("refs/remotes/origin/", "")
                .replaceFirst("refs/", "")
                .replaceFirst("origin/", "")
    }

    override fun updateState() {
        if (url.isNotBlank() && path.isNotBlank()) {
            httpGet(url = "$url$path/api/json?tree=lastBuild[$LAST_BUILD_PROPS]")
        } else {
            sendConfigurationError("Config error: Endpoint URL or Path is blank.")
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