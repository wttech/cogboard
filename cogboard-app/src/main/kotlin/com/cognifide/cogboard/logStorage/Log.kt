package main.kotlin.com.cognifide.cogboard.logStorage

import org.bson.Document
import org.bson.types.ObjectId
import java.util.*
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

data class LogVariableData(
    val name: String,
    val header: String,
    var description: String
) {
    private val map: Map<String, Any>
        get() = mapOf(
                "name" to name,
                "header" to header,
                "description" to description)

    fun toDocument() = Document(map)
    fun toJson() = JsonObject(map)

    companion object {
        fun from(document: Document): LogVariableData? {
            val name = document.getString("name") ?: return null
            val header = document.getString("header") ?: return null
            val description = document.getString("description") ?: return null

            return LogVariableData(name, header, description)
        }
    }
}

data class LogAdditionalData(
    val id: String,
    val ipAddress: String,
    val port: String,
    val type: String
) {
    private val map: Map<String, Any>
        get() = mapOf(
                "id" to id,
                "ipAddress" to ipAddress,
                "port" to port,
                "type" to type)

    fun toDocument() = Document(map)
    fun toJson() = JsonObject(map)

    companion object {
        fun from(document: Document): LogAdditionalData? {
            val id = document.getString("id") ?: return null
            val ipAddress = document.getString("ipAddress") ?: return null
            val port = document.getString("port") ?: return null
            val type = document.getString("type") ?: return null

            return LogAdditionalData(id, ipAddress, port, type)
        }
    }
}

data class Log(
    var date: Long,
    var type: String,
    var variableData: List<LogVariableData>,
    var additionalData: LogAdditionalData?
) {
    fun toDocument(): Document {
        val document = Document(mapOf(
                "_id" to ObjectId(),
                "date" to date,
                "type" to type,
                "variableData" to variableData.map { it.toDocument() },
        ))

        additionalData?.let { document.append("additionalData", it.toDocument()) }
        return document
    }

    fun toJson(): JsonObject {
        val document = JsonObject(mapOf(
                "_id" to ObjectId(),
                "date" to date,
                "type" to type,
                "variableData" to JsonArray(variableData.map { it.toJson() }),
        ))

        additionalData?.let { document.put("additionalData", it.toDocument()) }
        return document
    }

    companion object {
        fun from(document: Document): Log? {
            val date = document.getLong("date") ?: return null
            val type = document.getString("type") ?: return null
            val variableData = document
                    .getList("variableData", Document::class.java)
                    ?.mapNotNull { it }
                    ?.mapNotNull { LogVariableData.from(it) } ?: listOf()
            val additionalData = document
                    .get("additionalData", Document::class.java)
                    ?.let { LogAdditionalData.from(it) }

            return Log(date, type, variableData, additionalData)
        }
    }
}
