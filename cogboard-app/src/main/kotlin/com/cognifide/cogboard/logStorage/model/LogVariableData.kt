package com.cognifide.cogboard.logStorage.model

import io.vertx.core.json.JsonObject
import org.bson.Document

data class LogVariableData(
    val header: String,
    var description: String
) {
    private val map: Map<String, Any>
        get() = mapOf(
                HEADER to header,
                DESCRIPTION to description)

    fun toDocument() = Document(map)
    fun toJson() = JsonObject(map)

    companion object {
        const val HEADER = "header"
        const val DESCRIPTION = "description"
    }
}

fun Document.asLogVariableData() = LogVariableData(
        getString(LogVariableData.HEADER),
        getString(LogVariableData.DESCRIPTION)
)
