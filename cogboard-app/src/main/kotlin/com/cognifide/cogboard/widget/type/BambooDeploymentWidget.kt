package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class BambooDeploymentWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val idString: String = config.getString("idString", "")

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            val results = responseBody.getJsonArray("results")

            if (results != null && results.size() == 0) {
                sendNeverDeployed()
            } else if (results != null && results.size() == 1) {
                sendSuccess(results.first() as JsonObject)
            } else sendUnknownResponceError()
        }
    }

    private fun sendNeverDeployed() {
        send(JsonObject()
                .put(CC.PROP_STATUS, Widget.Status.UNKNOWN)
                .put(CC.PROP_CONTENT, JsonObject()
                        .put(CC.PROP_ERROR_MESSAGE, "Never Deployed")
                        .put(CC.PROP_ERROR_CAUSE, "")))
    }

    private fun sendSuccess(result: JsonObject) {
        val deploymentVersionName = result.getJsonObject("deploymentVersion").getString("name")
        val deploymentResultId = result.getInteger("id")

        result.put(CC.PROP_ERROR_MESSAGE, "")
        result.put(CC.PROP_URL, constructUrl(deploymentResultId))
        result.put(CC.PROP_RELEASE_NAME, deploymentVersionName)

        result.remove("items")

        send(JsonObject()
                .put(CC.PROP_STATUS, Widget.Status.from(result.getString("deploymentState")))
                .put(CC.PROP_CONTENT, result))
    }

    override fun updateState() {
        if (url.isNotBlank() && idString.isNotBlank()) {
            httpGet("$url/rest/api/latest/deploy/environment/$idString/results.json?max-results=1")
        } else {
            sendConfigurationError("Endpoint URL or ID is blank")
        }
    }

    private fun constructUrl(deploymentResultId: Int): String {
        return "$publicUrl/deploy/viewDeploymentResult.action?deploymentResultId=$deploymentResultId"
    }
}
