package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class PullRequestReminderWidget(vertx: Vertx, config: JsonObject, serv: BoardsConfigService) :
        AsyncWidget(vertx, config, serv) {

    private var path: String = config.getString("path", "")
    private val companyName: String = config.getString("companyName", "")

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
        // TODO: FIND BETTER WAY TO MANAGE THE API CALLS
        if (url.isBlank() || path.isBlank()) {
            sendConfigurationError("Endpoint URL or Path is blank.")
        }
        if (path[0].equals('/')) {
            path = path.replaceFirst("/", "")
        }

        var pathArgs = path.split("/")

        if (url.contains("bitbucket") && pathArgs[0].equals("dashboard")) {
            httpGet("$url/rest/api/1.0/dashboard/pull-requests")
            return
        } else if (pathArgs.size == 1) {
            sendConfigurationError("Path incorrect!")
            return
        }

        if (url.contains("github")) {
            var (owner, repo) = pathArgs
            val apiUrl = url.replace("github.com/", "api.github.com")
            httpGet(url = "$apiUrl/repos/$owner/$repo/pulls")
        }

        var (project, repo) = pathArgs
        httpGet(url = "$url/rest/api/1.0/projects/$project/repos/$repo/pull-requests")
    }
}
