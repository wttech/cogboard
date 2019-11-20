package com.cognifide.cogboard

import io.vertx.core.json.JsonObject

class TestHelper {
    companion object {
        fun readConfigFromResource(pathToJsonResource: String) : JsonObject {
            val fileContent = TestHelper::class.java.getResource(pathToJsonResource).readText()
            return JsonObject(fileContent.trimIndent())
        }
    }
}