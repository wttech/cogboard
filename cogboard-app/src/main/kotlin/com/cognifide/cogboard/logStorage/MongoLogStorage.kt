package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.http.auth.AuthenticationType
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.connectionStrategy.SSHConnectionStrategyInt
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParser
import com.mongodb.client.MongoClient
import com.mongodb.MongoException
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.ReplaceOptions
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import org.bson.Document
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers

class MongoLogStorage(private val connection: ConnectionStrategy, private val parser: LogParser) : AbstractVerticle() {

    private var connectionNew = SSHConnectionStrategyInt()
    private fun getClient(): MongoClient? {
        if (client != null) {
            return client
        }
        try {
            client = MongoClients.create("mongodb://root:root@mongo:27017/")
            return client
        } catch (exception: MongoException) {
            println("EXCEPTION: $exception")
        }
        return null
    }

    private fun getLogsCollection(id: String): MongoCollection<Document>? {
        return getClient()
                ?.getDatabase(DATABASE_NAME)
                ?.getCollection(id + LOGS_COLLECTION_SUFFIX)
    }

    // Configuration

    private fun getConfiguration(id: String): LogStorageConfiguration? {
        return getClient()
                ?.getDatabase(DATABASE_NAME)
                ?.getCollection(CONFIGURATION_COLLECTION_NAME)
                ?.find(eq("_id", id))
                ?.first()
                ?.let { LogStorageConfiguration.from(it) }
    }

    private fun saveConfiguration(id: String, configuration: LogStorageConfiguration) {
        val options = ReplaceOptions().upsert(true)
        getClient()
                ?.getDatabase(DATABASE_NAME)
                ?.getCollection(CONFIGURATION_COLLECTION_NAME)
                ?.replaceOne(
                        eq("_id", id),
                        configuration.toDocument(),
                        options
                )
    }

    // MongoDB - logs

    private fun removeAllLogs(id: String) {
        getLogsCollection(id)?.deleteMany(Document())
    }

    private fun insertLogs(id: String, logs: List<Document>) {
        getLogsCollection(id)?.insertMany(logs)
        // TODO: Check for the limit of the number of lines
    }

    private suspend fun downloadInsertLogs(id: String, seq: Long, skipFirstLines: Int? = null): Int {
        var sequence = seq
        val logs = connectionNew
                .getLogs(skipFirstLines)
                .mapNotNull { parser.parseLine(it) }
        logs.forEach {
            it.seq = sequence
            sequence += 1
        }

        insertLogs(id, logs.map { it.toDocument() })
        return logs.size
    }

    fun updateLogs(address: String, config: JsonObject) {
        val id = config.getString(Props.ID) ?: return

        connectionNew.configuration = config

        // Get the last read line from the configuration
        val storageConfig = getConfiguration(id)
        var lastLine = storageConfig?.lastLine ?: 0
        var seq = storageConfig?.seq ?: 0
        println("LASTLINE: $lastLine")

        // Get the length of the file
        coroutineScope.launch {
            println("COROUTINE START")

            // Get the number of lines in the file
            val fileLineCount = connectionNew.getNumberOfLines() ?: 0
            println("COROUTINE END, LINES: $fileLineCount")

            if (fileLineCount > 0 && fileLineCount > lastLine) {
                // Download new logs and append
                val inserted = downloadInsertLogs(id, seq, lastLine)
                lastLine += inserted
                seq += inserted
            } else if (fileLineCount in 1 until lastLine) {
                // Remove all logs and download from the beginning
                removeAllLogs(id)
                seq = 0
                val inserted = downloadInsertLogs(id, seq)
                lastLine = inserted
                seq += inserted.toLong()
            }
            // else do nothing

            saveConfiguration(id, LogStorageConfiguration(id, lastLine, seq, parser.variableFields))
        }
    }

    // Temporary: SSH configuration

    private fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.Props.ENDPOINT_LOADED)?.getString(prop) ?: ""
    }

    private fun prepareConfig(config: JsonObject): JsonObject {
        val tmpConfig = prepareConfigLines(config,
                Props.USER, Props.PASSWORD, Props.TOKEN, Props.SSH_KEY, Props.SSH_KEY_PASSPHRASE
        )

        tmpConfig.getString(Props.AUTHENTICATION_TYPES)
                ?: config.put(Props.AUTHENTICATION_TYPES, Json.encode(setOf(AuthenticationType.BASIC)))
        return tmpConfig
    }

    private fun prepareConfigLines(config: JsonObject, vararg fields: String): JsonObject {
        for (field in fields) {
            config.getString(field) ?: config.put(field, config.endpointProp(field))
        }
        return config
    }

    companion object {
        private var client: MongoClient? = null
        private const val DATABASE_NAME: String = "logs"
        private const val CONFIGURATION_COLLECTION_NAME: String = "config"
        private const val LOGS_COLLECTION_SUFFIX: String = "_logs"
        private const val CONFIG_COLLECTION_SUFFIX: String = "_config"

        val coroutineScope = CoroutineScope(Job() + Dispatchers.IO)
    }
}
