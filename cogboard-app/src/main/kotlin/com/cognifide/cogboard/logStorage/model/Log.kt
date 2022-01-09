package com.cognifide.cogboard.logStorage.model

import io.vertx.core.json.JsonObject
import org.bson.Document
import org.bson.types.ObjectId
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

data class Log(
    var id: ObjectId = ObjectId(),
    var seq: Long = 0,
    var insertedOn: Long = Instant.now().epochSecond,
    var date: Long,
    var type: String,
    var variableData: List<LogVariableData>
) {
    fun toDocument() = Document(mapOf(
            ID to id,
            SEQ to seq,
            INSERTED_ON to insertedOn,
            DATE to date,
            TYPE to type,
            VARIABLE_DATA to variableData.map { it.toDocument() }
    ))
    fun toJson() = JsonObject(mapOf(
            ID to id.toHexString(),
            SEQ to seq,
            INSERTED_ON to insertedOn,
            DATE to (LocalDateTime
                    .ofEpochSecond(date, 0, ZoneOffset.UTC)
                    .format(DateTimeFormatter.ISO_DATE_TIME) ?: ""),
            TYPE to type,
            VARIABLE_DATA to variableData.map { it.toJson() }
    ))

    companion object {
        const val ID = "_id"
        const val SEQ = "seq"
        const val INSERTED_ON = "insertedOn"
        const val DATE = "date"
        const val TYPE = "type"
        const val VARIABLE_DATA = "variableData"
    }
}

fun Document.asLog() = Log(
        getObjectId(Log.ID),
        getLong(Log.SEQ),
        getLong(Log.INSERTED_ON),
        getLong(Log.DATE),
        getString(Log.TYPE),
        getList(Log.VARIABLE_DATA, Document::class.java).map { it.asLogVariableData() }
)
