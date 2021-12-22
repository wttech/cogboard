package com.cognifide.cogboard.logStorage.model

import org.bson.Document

data class LogCollectionConfiguration(
    var id: String,
    var lastLine: Long,
    var seq: Long
) {
    private val map: Map<String, Any>
        get() = mapOf(
                ID to id,
                LAST_LINE to lastLine,
                SEQ to seq
        )
    fun toDocument() = Document(map)

    companion object {
        const val ID = "_id"
        const val LAST_LINE = "lastLine"
        const val SEQ = "seq"

        fun from(document: Document): LogCollectionConfiguration? {
            return try {
                val id = document.getString(ID)
                val lastLine = document.getLong(LAST_LINE)
                val seq = document.getLong(SEQ)

                LogCollectionConfiguration(id, lastLine, seq)
            } catch (_: NullPointerException) {
                null
            }
        }
    }
}
