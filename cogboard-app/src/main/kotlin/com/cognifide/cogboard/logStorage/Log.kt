package main.kotlin.com.cognifide.cogboard.logStorage

import org.bson.Document
import org.bson.types.ObjectId
import io.vertx.core.json.JsonObject

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
    var date: Long,
    var type: String,
    var variableData: List<LogVariableData>
) {
    fun toDocument() = Document(mapOf(
            "_id" to id,
            "seq" to seq,
            "date" to date,
            "type" to type,
            "variableData" to variableData.map { it.toDocument() }
    ))
    fun toJson() = JsonObject(mapOf(
            "_id" to id.toHexString(),
            "seq" to seq,
            "date" to date,
            "type" to type,
            "variableData" to variableData.map { it.toJson() }
    ))

    companion object {
        fun from(document: Document): Log? {
            val id = document.getObjectId("_id")
            val seq = document.getLong("seq")
            val date = document.getLong("date")
            val type = document.getString("type")

            if (arrayOf(id, seq, date, type).contains(null)) { return null }

            val variableData = document
                    .getList("variableData", Document::class.java)
                    ?.mapNotNull { it }
                    ?.mapNotNull { LogVariableData.from(it) } ?: listOf()
            return Log(id, seq, date, type, variableData)
        }
    }
}
