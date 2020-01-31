package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class CatsWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    override fun updateState() {
        httpGet(url = "https://random.cat/view/${(1..1000).random()}")
    }

    override fun handleResponse(responseBody: JsonObject) {
        val imageUrl = responseBody.getString("body")
                ?.substringBefore("\" alt=\"\" title=\"\" id=\"cat\"")
                ?.substringAfterLast("src=\"")
        val content = JsonObject().put("imageUrl", imageUrl)

        send(JsonObject().put(CogboardConstants.PROP_CONTENT, content))
    }
}
