package com.cognifide.cogboard.logStorage.model

import org.bson.Document

data class LogCollectionState(
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
    }
}

fun Document.asLogCollectionState(): LogCollectionState? {
    return try {
        val id = getString(LogCollectionState.ID)
        val lastLine = getLong(LogCollectionState.LAST_LINE)
        val seq = getLong(LogCollectionState.SEQ)

        LogCollectionState(id, lastLine, seq)
    } catch (_: NullPointerException) {
        null
    }
}
