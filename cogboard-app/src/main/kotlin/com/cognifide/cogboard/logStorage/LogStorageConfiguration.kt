package com.cognifide.cogboard.logStorage

import org.bson.Document

data class LogStorageConfiguration(
    var id: String,
    var lastLine: Int,
    var seq: Long,
    var variableFields: List<String>
) {
    private val map: Map<String, Any>
        get() = mapOf(
                "_id" to id,
                "lastLine" to lastLine,
                "seq" to seq,
                "variableFields" to variableFields
        )
    fun toDocument() = Document(map)

    companion object {
        const val CONFIG_ID: String = "config"
        fun from(document: Document): LogStorageConfiguration? {
            val id = document.getString("_id")
            val lastLine = document.getInteger("lastLine")
            val seq = document.getLong("seq")
            val variableFields = document.getList("variableFields", String::class.java)

            if (arrayOf(id, lastLine, seq, variableFields).contains(null)) {
                return null
            }

            return LogStorageConfiguration(id, lastLine, seq, emptyList())
        }
    }
}
