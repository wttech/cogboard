package com.cognifide.cogboard.logStorage

import org.bson.Document

data class LogCollectionConfiguration(
    var id: String,
    var lastLine: Int,
    var seq: Long
) {
    private val map: Map<String, Any>
        get() = mapOf(
                "_id" to id,
                "lastLine" to lastLine,
                "seq" to seq
        )
    fun toDocument() = Document(map)

    companion object {
        const val CONFIG_ID: String = "config"
        fun from(document: Document): LogCollectionConfiguration? {
            val id = document.getString("_id")
            val lastLine = document.getInteger("lastLine")
            val seq = document.getLong("seq")

            if (arrayOf(id, lastLine, seq).contains(null)) {
                return null
            }

            return LogCollectionConfiguration(id, lastLine, seq)
        }
    }
}
