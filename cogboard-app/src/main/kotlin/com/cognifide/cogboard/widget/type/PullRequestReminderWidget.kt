package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class PullRequestReminderWidget(vertx: Vertx, config: JsonObject, serv: BoardsConfigService) :
        AsyncWidget(vertx, config, serv) {

    private var path: String = config.getString("path", "")

    override fun handleResponse(responseBody: JsonObject) {
        var pullRequests = responseBody

        if (url.contains("github")) {
            pullRequests =
                    pullRequests
                            .put(Props.PULL_REQUESTS, responseBody.remove("array"))
                            .put(Props.REPOSITORY_HUB, "github")
        } else {
            pullRequests =
                    pullRequests
                            .put(Props.PULL_REQUESTS, responseBody.remove("values"))
                            .put(Props.REPOSITORY_HUB, "bitbucket")
        }

        send(pullRequests)
    }

    override fun updateState() {

        if (url.isBlank() || path.isBlank()) {
            sendConfigurationError("Endpoint URL or Path is blank.")
        }

        if (url.contains("github")) {
            var (_, owner, repo) = path.split("/")
            var apiUrl = url.replace("://", "://api.").replace("com/", "com")
            httpGet("$apiUrl/repos/$owner/$repo/pulls")
        } else if (url.contains("bitbucket") && path.contains("dashboard")) {
            httpGet("$url/rest/api/1.0/dashboard/pull-requests")
            return
        } else {
            var (_, project, repo) = path.split("/")
            httpGet(url = "$url/rest/api/1.0/projects/$project/repos/$repo/pull-requests")
        }
    }
}
