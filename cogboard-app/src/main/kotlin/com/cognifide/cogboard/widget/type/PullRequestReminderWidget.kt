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
        send(responseBody.put(Props.PULL_REQUESTS, responseBody.remove("array")))
    }

    override fun updateState() {
        if (url.isNotBlank() && path.isNotBlank()) {
            val apiUrl = url.replace("github.com/", "api.github.com")
            httpGet(url = "$apiUrl/repos$path/pulls")
        } else {
            sendConfigurationError("Endpoint URL or Path is blank.")
        }
    }
}
