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

        fun from(document: Document): LogVariableData? {
            val header = document.getString(HEADER) ?: return null
            val description = document.getString(DESCRIPTION) ?: return null

            return LogVariableData(header, description)
        }
    }
}
