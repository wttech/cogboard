package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

/**
 * Example response:
{
"_class": "hudson.maven.MavenModuleSet",
"lastBuild": {
"_class": "hudson.maven.MavenModuleSetBuild",
"building": false,
"description": null,
"displayName": "#1071",
"duration": 480621,
"estimatedDuration": 443093,
"executor": null,
"fullDisplayName": "Project » build-name #1017",
"id": "1071",
"result": "SUCCESS",
"timestamp": 1564457216813,
"url": "http://server.com/job/Project/job/build-name/1071/",
"builtOn": "QA-Automation-Win7-64bit-10"
}
}
 */
class JenkinsJobWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val path: String = config.getString("path", "")
    private val url: String = config.endpointProp("url")

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.getJsonObject("lastBuild")?.let {
            val status = if (it.getBoolean("building", false)) Widget.Status.IN_PROGRESS
            else Widget.Status.from(it.getString("result"))

            send(JsonObject()
                    .put(CogboardConstants.PROP_ID, id)
                    .put(CogboardConstants.PROP_STATUS, status)
                    .put(CogboardConstants.PROP_CONTENT, it))
        }
    }

    override fun updateState() {
        if (url.isNotBlank() && path.isNotBlank()) {
            httpGet(url = "$url$path/api/json?tree=lastBuild[$LAST_BUILD_PROPS]")
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
                "builtOn"
        ).joinToString(separator = ",")
    }
}