package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import java.io.File

class ContentRepository(private val path: String) {
    fun save(widgetId: String, content: JsonObject) {
        File("$path/$widgetId.json")
                .writeText(content.toString())
    }
}