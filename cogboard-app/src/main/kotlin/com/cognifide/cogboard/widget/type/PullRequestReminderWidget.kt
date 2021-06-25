package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants.Props
class PullRequestReminderWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val path: String = config.getString("path", "")

    override fun handleResponse(responseBody: JsonObject) {
        var pullRequests = responseBody

        if (url.contains("github")) {
            pullRequests = pullRequests
            .put(Props.PULL_REQUESTS, responseBody.remove("array"))
            .put(Props.REPOSITORY_HUB, "github")
        } else {
            pullRequests = pullRequests
            .put(Props.PULL_REQUESTS, responseBody.remove("values"))
            .put(Props.REPOSITORY_HUB, "bitbucket")
        }

        send(pullRequests)
    }

    override fun updateState() {
        if (url.isNotBlank() && path.isNotBlank()) {
            if (url.contains("github")) {
                val apiUrl = url.replace("github.com/", "api.github.com")
                httpGet(url = "$apiUrl/repos$path/pulls")
            } else {
                httpGet(url = "https://api.bitbucket.org/2.0/repositories$path/pullrequests")
            }
        } else {
            sendConfigurationError("Endpoint URL or Path is blank.")
        }
    }
}
