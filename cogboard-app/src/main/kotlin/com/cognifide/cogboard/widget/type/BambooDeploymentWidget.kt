package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class BambooDeploymentWidget(
    vertx: Vertx,
    config: JsonObject,
    boardService: BoardsConfigService = BoardsConfigService()
) : AsyncWidget(vertx, config, boardService) {

    private val idString: String = config.getString("idString", "")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val results = responseBody.getJsonArray("results")

            if (results != null && results.size() == 0) {
                sendNeverDeployed()
            } else if (results != null && results.size() == 1) {
                sendSuccess(results.first() as JsonObject)
            } else sendUnknownResponseError()
        }
    }

    private fun sendNeverDeployed() {
        send(JsonObject()
                .put(CC.PROP_ERROR_MESSAGE, "Never Deployed")
                .put(CC.PROP_ERROR_CAUSE, "")
                .put(CC.PROP_WIDGET_STATUS, Widget.Status.UNKNOWN))
    }

    private fun sendSuccess(result: JsonObject) {
        val deploymentVersionName = result.getJsonObject("deploymentVersion").getString("name")
        val deploymentResultId = result.getInteger("id")

        result.apply {
            put(CC.PROP_URL, constructUrl(deploymentResultId))
            put(CC.PROP_RELEASE_NAME, deploymentVersionName)
            put(CC.PROP_WIDGET_STATUS, getStatus(result))
            remove("items")
        }

        send(result)
    }

    override fun updateState() {
        if (url.isNotBlank() && idString.isNotBlank()) {
            httpGet("$url/rest/api/latest/deploy/environment/$idString/results.json?max-results=1")
        } else {
            sendConfigurationError("Endpoint URL or ID is blank")
        }
    }

    /** Patch up the case where `deploymentState` doesn't tell us anything useful */
    private fun getStatus(result: JsonObject): Widget.Status {
        val deploymentState = Widget.Status.from(result.getString("deploymentState"))

        if (deploymentState == Widget.Status.UNKNOWN) {
            val lifeCycleState = Widget.Status.from(result.getString("lifeCycleState"))

            if (lifeCycleState != Widget.Status.UNKNOWN) {
                return lifeCycleState
            }
        }

        return deploymentState
    }

    private fun constructUrl(deploymentResultId: Int): String {
        return "$publicUrl/deploy/viewDeploymentResult.action?deploymentResultId=$deploymentResultId"
    }
}
