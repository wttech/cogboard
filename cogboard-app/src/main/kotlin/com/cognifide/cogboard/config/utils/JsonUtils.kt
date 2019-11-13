package com.cognifide.cogboard.config.utils

import io.vertx.core.json.JsonArray

object JsonUtils {

    fun JsonArray.getObjectPositionById(idKey: String, idValue: String): Int {
        var index = 0
        while (index <= this.size()) {
            val credential = this.getJsonObject(index)
            if (credential.getString(idKey) == idValue) {
                break
            }
            index++
        }
        return index
    }
}