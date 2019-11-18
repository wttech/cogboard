package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import java.io.File

class ContentRepository(private val path: String = "/data/content") {
    fun save(widgetId: String, content: JsonObject) {
        File("$path/$widgetId.json")
                .writeText(content.toString())
    }

    fun get(widgetId: String): JsonObject {
        return JsonObject(File("$path/$widgetId.json").readText())
    }
}
