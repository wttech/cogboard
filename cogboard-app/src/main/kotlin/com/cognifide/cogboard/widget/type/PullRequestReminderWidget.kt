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
        if (path[0].equals('/')) {
            path = path.drop(1)
        }

        var pathArgs = path.split("/")

        if (url.contains("bitbucket") && pathArgs[0].equals("dashboard")) {
            httpGet("$url/rest/api/1.0/dashboard/pull-requests")
            return
        } else if (pathArgs.size == 1) {
            return
        }

        if (url.contains("github")) {
            var apiUrl = url.replace("://github", "://api.github").replace(".com/", ".com")
            httpGet(url = "$apiUrl/repos/$path/pulls")
        }

        var (project, repo) = pathArgs
        httpGet(url = "$url/rest/api/1.0/projects/$project/repos/$repo/pull-requests")
    }
}
