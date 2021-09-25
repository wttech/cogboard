package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class LogViewerWidget(
        vertx: Vertx,
        config: JsonObject,
        serv: BoardsConfigService
): AsyncWidget(vertx, config, serv) {
    private val lines = config.getInteger(Props.LOG_LINES)

    override fun updateState() {
        if (url.isNotBlank()) {
            httpGet("$url?lines=$lines")
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val logs = responseBody.getString(Props.LOG_LINES)

            send(logs)
        }
    }
}