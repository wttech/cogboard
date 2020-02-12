package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import java.io.File

class ContentRepository(private val configRoot: String = "/data") {

    fun save(widgetId: String, content: JsonObject) {
        getFile(widgetId).writeText(content.toString())
    }

    fun get(widgetId: String): JsonObject {
        val file = getFile(widgetId)
        return if (file.exists()) JsonObject(file.readText()) else JsonObject()
    }

    fun delete(widgetId: String) {
        val file = getFile(widgetId)
        if (file.exists()) file.delete()
    }

    private fun getFile(widgetId: String) = File("$configRoot/content/$widgetId.json")
}
