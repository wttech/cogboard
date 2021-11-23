package main.kotlin.com.cognifide.cogboard.logStorage

import org.bson.Document
import org.bson.types.ObjectId
import io.vertx.core.json.JsonObject
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

data class LogVariableData(
    val header: String,
    var description: String
) {
    private val map: Map<String, Any>
        get() = mapOf(
                "header" to header,
                "description" to description)

    fun toDocument() = Document(map)
    fun toJson() = JsonObject(map)

    companion object {
        fun from(document: Document): LogVariableData? {
            val header = document.getString("header") ?: return null
            val description = document.getString("description") ?: return null

            return LogVariableData(header, description)
        }
    }
}

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

        fun from(document: Document): Log? {
            return try {
                val id = document.getObjectId(ID)!!
                val seq = document.getLong(SEQ)!!
                val insertedOn = document.getLong(INSERTED_ON)!!
                val date = document.getLong(DATE)!!
                val type = document.getString(TYPE)!!

                val variableData = document
                        .getList(VARIABLE_DATA, Document::class.java)
                        ?.mapNotNull { it }
                        ?.mapNotNull { LogVariableData.from(it) } ?: listOf()
                Log(id, seq, insertedOn, date, type, variableData)
            } catch (_: NullPointerException) {
                null
            }
        }
    }
}
