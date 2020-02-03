package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class CatsWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    override fun updateState() {
        httpGet(url = "http://aws.random.cat/meow")
    }

    override fun handleResponse(responseBody: JsonObject) {
        val imageUrl = responseBody.getString("file")
        val content = JsonObject().put("imageUrl", imageUrl)

        send(JsonObject().put(CogboardConstants.PROP_CONTENT, content))
    }
}
