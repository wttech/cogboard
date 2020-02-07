package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import java.io.File

class ContentRepository(private val configRoot: String = "/data") {

    fun save(widgetId: String, content: JsonObject) {
        File("$configRoot/content/$widgetId.json").writeText(content.toString())
    }

    fun get(widgetId: String): JsonObject {
        val file = File("$configRoot/content/$widgetId.json")
        return if (file.exists()) JsonObject(file.readText()) else JsonObject()
    }

    fun delete(widgetId: String) {
        val file = File("$configRoot/content/$widgetId.json")
        if (file.exists()) file.delete()
    }
}
