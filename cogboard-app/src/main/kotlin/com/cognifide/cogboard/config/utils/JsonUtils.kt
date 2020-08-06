package com.cognifide.cogboard.config.utils

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.util.*
import java.util.stream.Collectors

object JsonUtils {

    fun JsonArray.findById(idValue: String, idKey: String = CogboardConstants.PROP_ID): JsonObject {
        return this.findByKeyValue(idValue, idKey)
    }

    private fun JsonArray.findByKeyValue(value: String, key: String): JsonObject {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(key) == value }
                .findFirst()
                .orElse(JsonObject())
    }

    fun JsonArray.findAllByKeyValue(value: String, key: String): List<JsonObject> {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(key) == value }
                .collect(Collectors.toList())
    }

    fun JsonArray.getObjectPositionById(idValue: String, idKey: String = CogboardConstants.PROP_ID): Int {
        var index = 0
        while (index < this.size()) {
            val credential = this.getJsonObject(index)
            if (credential.getString(idKey) == idValue) {
                break
            }
            index++
        }
        return index
    }

    fun JsonObject.putIfNotExist(key: String, value: Any): JsonObject {
        if (!this.containsKey(key)) {
            this.put(key, value)
        }
        return this
    }
}
