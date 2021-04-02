package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.EventType
import com.cognifide.cogboard.config.service.VersionService
import io.vertx.core.AbstractVerticle
import io.vertx.core.http.HttpHeaders
import io.vertx.core.json.JsonObject

class VersionController : AbstractVerticle() {

    private lateinit var versionService: VersionService

    override fun start() {
        versionService = VersionService()

        listenOnCheckVersion()
        listenOnNewVersionResponse()
    }

    private fun listenOnCheckVersion() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.VERSION_CONFIG)
            .handler {
                if (versionService.isLatestVersionAvailable()) {
                    sendResponse(versionService.prepareVersionResponse())
                } else {
                    sendRequestForNewVersion()
                }
            }

    private fun listenOnNewVersionResponse() = vertx
            .eventBus()
            .consumer<JsonObject>(NEW_VERSION_RESPONSE)
            .handler {
                if (versionService.checkVersion(it.body())) {
                    sendResponse(versionService.prepareVersionResponse())
                }
            }

    private fun sendResponse(response: JsonObject) {
        val message = JsonObject()
        message.put(Props.EVENT_TYPE, EventType.NEW_VERSION)
        message.put(Props.CONTENT, response)
        vertx.eventBus().send(Event.SEND_MESSAGE_TO_WEBSOCKET, message)
    }

    private fun sendRequestForNewVersion() {
        vertx.eventBus().send(Event.HTTP_GET,
                JsonObject()
                        .put(Props.URL, GITHUB_REPOSITORY_LATEST_VERSION_URL)
                        .put(Props.EVENT_ADDRESS, NEW_VERSION_RESPONSE)
                        .put(Props.HEADERS, JsonObject()
                                .put(HttpHeaders.USER_AGENT.toString(), USER_AGENT_HEADER))
        )
    }

    companion object {
        const val GITHUB_REPOSITORY_LATEST_VERSION_URL =
                "https://api.github.com/repos/wttech/cogboard/releases/latest"
        const val USER_AGENT_HEADER = "Cogboard"
        const val NEW_VERSION_RESPONSE = "cogboard.config.handler.version.new"
    }
}
