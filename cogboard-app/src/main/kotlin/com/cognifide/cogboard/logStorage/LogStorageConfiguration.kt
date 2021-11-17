package com.cognifide.cogboard.logStorage

import org.bson.Document

data class LogStorageConfiguration(var lastLine: Int, var seq: Long) {
    private val map: Map<String, Any>
        get() = mapOf(
                "_id" to CONFIG_ID,
                "lastLine" to lastLine,
                "seq" to seq
        )
    fun toDocument() = Document(map)

    companion object {
        const val CONFIG_ID: String = "config"
        fun from(document: Document): LogStorageConfiguration? {
            val lastLine = document.getInteger("lastLine") ?: return null
            val seq = document.getLong("seq") ?: return null
            return LogStorageConfiguration(lastLine, seq)
        }
    }
}
