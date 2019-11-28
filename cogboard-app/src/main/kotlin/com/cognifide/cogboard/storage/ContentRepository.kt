package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import java.io.File

class ContentRepository(private val path: String = "/data/content") {

    init {
        if (!File(path).exists()) {
            File(path).mkdir()
        }
    }

    fun save(widgetId: String, content: JsonObject) {
        File("$path/$widgetId.json").writeText(content.toString())
    }

    fun get(widgetId: String): JsonObject {
        val file = File("$path/$widgetId.json")
        return if (file.exists()) JsonObject(file.readText()) else JsonObject()
    }
}
