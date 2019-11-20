package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import java.io.File

class ContentRepository(private val path: String = "/data/content") {

    fun save(widgetId: String, content: JsonObject) {
        if (File(path).exists()) {
            File("$path/$widgetId.json").writeText(content.toString())
        } else {
            LOGGER.warn("Content for $widgetId not saved because folder $path does not exist")
        }
    }

    fun get(widgetId: String): JsonObject {
        val file = File("$path/$widgetId.json")
        return if (file.exists()) JsonObject(file.readText()) else JsonObject()
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ContentRepository::class.java)
    }
}
