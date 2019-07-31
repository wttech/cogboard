package com.cognifide.cogboard.storage

import io.vertx.core.json.JsonObject

class MockStorage : Storage {

    var configJson: JsonObject

    init {
        val conf = MockStorage::class.java.classLoader.getResource("data.json")?.readText()
        configJson = JsonObject(conf)
    }

    override fun loadConfig(): JsonObject {
        return configJson
    }

    override fun saveConfig(config: JsonObject) {
        configJson = config
    }
}