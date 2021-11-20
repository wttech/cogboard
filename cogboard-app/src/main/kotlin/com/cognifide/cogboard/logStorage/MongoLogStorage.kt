package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategyInt
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParser
import com.mongodb.client.MongoClient
import com.mongodb.MongoException
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Sorts.descending
import com.mongodb.client.model.ReplaceOptions
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.bson.Document
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import main.kotlin.com.cognifide.cogboard.logStorage.Log
import main.kotlin.com.cognifide.cogboard.logStorage.LogStorageConfiguration

class MongoLogStorage(
    private val config: LogStorageConfiguration,
    private val connection: ConnectionStrategyInt,
    private val parser: LogParser
) : AbstractVerticle() {

    private val logsCollection: MongoCollection<Document>?
    get() = database?.getCollection(config.id + LOGS_COLLECTION_SUFFIX)

    // Storage configuration

    private val collectionConfiguration: LogCollectionConfiguration?
    get() = database
            ?.getCollection(CONFIGURATION_COLLECTION_NAME)
            ?.find(eq("_id", config.id))
            ?.first()
            ?.let { LogCollectionConfiguration.from(it) }

    private fun saveConfiguration(configuration: LogCollectionConfiguration) {
        val options = ReplaceOptions().upsert(true)
        database
                ?.getCollection(CONFIGURATION_COLLECTION_NAME)
                ?.replaceOne(
                        eq("_id", config.id),
                        configuration.toDocument(),
                        options
                )
    }

    // MongoDB - logs

    private fun removeAllLogs() {
        logsCollection?.deleteMany(Document())
    }

    private fun downloadInsertLogs(seq: Long, skipFirstLines: Int? = null): Int {
        var sequence = seq
        val logs = connection
                .getLogs(skipFirstLines)
                .mapNotNull { parser.parseLine(it) }
        logs.forEach {
            it.seq = sequence
            sequence += 1
        }

        logsCollection?.insertMany(logs.map { it.toDocument() })
        // TODO: Check for the limit of the number of lines

        return logs.size
    }

    private val logs: List<Log>
    get() = logsCollection
            ?.find()
            ?.sort(descending("seq"))
            ?.mapNotNull { it }
            ?.mapNotNull { Log.from(it) }
            ?: emptyList()

    private fun prepareResponse(): JsonObject {
        return JsonObject(mapOf(
            "variableFields" to parser.variableFields,
            "logs" to JsonArray(logs.map { it.toJson() })
        ))
    }

    fun updateLogs() {

        // Get the last read line from the configuration
        val storageConfig = collectionConfiguration
        var lastLine = storageConfig?.lastLine ?: 0
        var seq = storageConfig?.seq ?: 0
        println("LASTLINE: $lastLine")
        println("HAVE VERTX A? $vertx")

        // Get the length of the file
        coroutineScope.launch {
            println("COROUTINE START")
            println("HAVE VERTX B? $vertx")

            // Get the number of lines in the file
            val fileLineCount = connection.getNumberOfLines() ?: 0
            println("COROUTINE END, LINES: $fileLineCount")

            if (fileLineCount > 0 && fileLineCount > lastLine) {
                // Download new logs and append
                val inserted = downloadInsertLogs(seq, lastLine)
                lastLine += inserted
                seq += inserted
            } else if (fileLineCount in 1 until lastLine) {
                // Remove all logs and download from the beginning
                removeAllLogs()
                seq = 0
                val inserted = downloadInsertLogs(seq)
                lastLine = inserted
                seq += inserted.toLong()
            }
            // else do nothing

            saveConfiguration(LogCollectionConfiguration(config.id, lastLine, seq))

            // Fetch the logs from database
            val response = prepareResponse()
            println("HAVE VERTX C? $vertx")
            vertx?.eventBus()?.send("event.widget.widget1_alt", response)
        }
    }

    companion object {
        private const val DATABASE_NAME: String = "logs"
        private const val CONFIGURATION_COLLECTION_NAME: String = "config"
        private const val LOGS_COLLECTION_SUFFIX: String = "_logs"
        private var mongoClient: MongoClient? = null

        private val client: MongoClient?
        get() {
            if (mongoClient != null) {
                return mongoClient
            }
            try {
                mongoClient = MongoClients.create("mongodb://root:root@mongo:27017/")
                return mongoClient
            } catch (exception: MongoException) {
                println("EXCEPTION: $exception")
            }
            return null
        }

        private val database: MongoDatabase?
        get() = client?.getDatabase(DATABASE_NAME)

        val coroutineScope = CoroutineScope(Job() + Dispatchers.IO)
    }
}
