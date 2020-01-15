package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class JenkinsJobWidget(
    vertx: Vertx,
    config: JsonObject,
    boardService: BoardsConfigService = BoardsConfigService()
) : AsyncWidget(vertx, config, boardService) {

    private val path: String = config.getString("path", "")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val lastBuild = responseBody.getJsonObject("lastBuild")

            if (lastBuild != null) {
                sendSuccess(lastBuild)
            } else sendUnknownResponseError()
        }
    }

    private fun sendSuccess(lastBuild: JsonObject) {
        val status = if (lastBuild.getBoolean("building", false)) Widget.Status.IN_PROGRESS
        else Widget.Status.from(lastBuild.getString("result", ""))

        lastBuild.put("branch", extractBranchInfo(lastBuild))
            .put(CC.PROP_URL, makePublic(lastBuild.getString(CC.PROP_URL, "")))
            .put(CC.PROP_WIDGET_STATUS, status)

        send(JsonObject()
                .put(CC.PROP_CONTENT, lastBuild))
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
            sendConfigurationError("Endpoint URL or Path is blank.")
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
