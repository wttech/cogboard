package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParser
import com.mongodb.client.MongoClient
import com.mongodb.MongoException
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Filters.`in`
import com.mongodb.client.model.Indexes
import com.mongodb.client.model.Sorts.descending
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.client.model.Sorts.ascending
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import org.bson.Document
import main.kotlin.com.cognifide.cogboard.logStorage.Log
import main.kotlin.com.cognifide.cogboard.logStorage.LogStorageConfiguration
import java.time.Instant

class LogStorage(
    private val config: LogStorageConfiguration,
    private val connection: ConnectionStrategy,
    private val parser: LogParser
) : AbstractVerticle() {

    override fun start() {
        super.start()
        logsCollection?.createIndex(Indexes.descending(Log.SEQ))
    }

    /** Returns a logs collection associated with this widget. */
    private val logsCollection: MongoCollection<Document>?
    get() = database?.getCollection(config.id)

    // Storage configuration

    /** Returns a logs collection configuration associated with this widget (if present). */
    private val collectionConfiguration: LogCollectionConfiguration?
    get() = configCollection
            ?.find(eq(Log.ID, config.id))
            ?.first()
            ?.let { LogCollectionConfiguration.from(it) }

    /** Saves or deletes a logs collection [configuration] associated with this widget. */
    private fun saveConfiguration(configuration: LogCollectionConfiguration?) {
        if (configuration != null) {
            val options = ReplaceOptions().upsert(true)
            configCollection
                    ?.replaceOne(
                            eq(LogCollectionConfiguration.ID, config.id),
                            configuration.toDocument(),
                            options
                    )
        } else {
            configCollection?.deleteOne((eq(LogCollectionConfiguration.ID, config.id)))
        }
    }

    // MongoDB - logs

    /** Deletes all logs from the collection. */
    private fun deleteAllLogs() {
        logsCollection?.drop()
    }

    /** Deletes the [n] first logs (ordered by their sequence number). */
    private fun deleteFirstLogs(n: Long) {
        val collection = logsCollection ?: return
        val ids = collection
                .find()
                .sort(ascending(Log.SEQ))
                .limit(n.toInt())
                .mapNotNull { it?.getObjectId(Log.ID) }
        if (ids.isNotEmpty()) {
            try {
                val result = collection.deleteMany(`in`(Log.ID, ids))
                LOGGER.debug("Deleted ${result.deletedCount} first logs")
            } catch (exception: MongoException) {
                LOGGER.error("Cannot delete first logs: $exception")
            }
        }
    }

    /** Deletes old logs (based on the number of days before expiration). */
    private fun deleteOldLogs() {
        val collection = logsCollection ?: return
        val now = Instant.now().epochSecond
        val beforeTimestamp = now - (config.expirationDays * DAY_TO_TIMESTAMP)
        try {
            val result = collection.deleteMany(lt(Log.INSERTED_ON, beforeTimestamp))
            LOGGER.debug("Deleted ${result.deletedCount} old logs")
        } catch (exception: MongoException) {
            LOGGER.error("Cannot delete old logs: $exception")
        }
    }

    /** Deletes oldest logs when there are too many logs. */
    private fun deleteRedundantLogs() {
        val collection = logsCollection ?: return
        val redundantLines = collection.countDocuments() - config.logLines
        if (redundantLines > 0) {
            LOGGER.debug("Deleting redundant $redundantLines logs")
            deleteFirstLogs(redundantLines)
        }
    }

    /** Deletes oldest logs when logs take up too much space. */
    private fun deleteSpaceConsumingLogs() {
        val database = database ?: return
        val collection = logsCollection ?: return

        val size = database
                .runCommand(Document(STATS_COMMAND, config.id))
                .getInteger(STATS_SIZE) ?: 0
        val maxSize = config.fileSizeMB * MB_TO_BYTES
        if (size > 0 && size > maxSize) {
            val deleteFactor = ((size - maxSize).toDouble() / size)
            val logCount = collection.countDocuments()
            val toDelete = (logCount.toDouble() * deleteFactor).toLong()
            if (toDelete > 0) {
                LOGGER.debug("Deleting $toDelete logs as the size $size exceeds maximum size of $maxSize")
                deleteFirstLogs(toDelete)
            }
        }
    }

    /** Downloads new logs and inserts the to the database. */
    private fun downloadInsertLogs(seq: Long, skipFirstLines: Long? = null): Long {
        var sequence = seq
        val logs = connection
                .getLogs(skipFirstLines)
                .mapNotNull { parser.parseLine(it) }
        logs.forEach {
            it.seq = sequence
            sequence += 1
        }

        logsCollection?.insertMany(logs.map { it.toDocument() })

        return logs.size.toLong()
    }

    /** Returns all logs for this instance, sorted by their sequence number. */
    private val logs: List<Log>
    get() = logsCollection
            ?.find()
            ?.sort(descending(Log.SEQ))
            ?.mapNotNull { it }
            ?.mapNotNull { Log.from(it) }
            ?: emptyList()

    /** Prepares a JSON response to be displayed */
    private fun prepareResponse(): JsonObject {
        return JsonObject(mapOf(
            "variableFields" to parser.variableFields,
            "logs" to JsonArray(logs.map { it.toJson() })
        ))
    }

    /** Updates the logs and sends them to the widget. */
    fun updateLogs() {
        // Get the last read line from the configuration
        val storageConfig = collectionConfiguration
        var lastLine = storageConfig?.lastLine ?: 0
        var seq = storageConfig?.seq ?: 0

        // Get the number of lines in the file
        val fileLineCount = connection.getNumberOfLines() ?: 0

        if (fileLineCount > 0 && fileLineCount > lastLine) {
            // Download new logs and append
            val inserted = downloadInsertLogs(seq, lastLine)
            lastLine += inserted
            seq += inserted
        } else if (fileLineCount in 1 until lastLine) {
            // Remove all logs and download from the beginning
            deleteAllLogs()
            seq = 0
            val inserted = downloadInsertLogs(seq)
            lastLine = inserted
            seq += inserted
        }

        // Delete unnecessary logs
        deleteOldLogs()
        deleteRedundantLogs()
        deleteSpaceConsumingLogs()

        // Save the new configuration
        saveConfiguration(LogCollectionConfiguration(config.id, lastLine, seq))

        // Fetch the logs from database
        val response = prepareResponse()
        vertx?.eventBus()?.send(config.eventBusAddress, response)
    }

    /** Deletes all data associated with the widget. */
    fun delete() {
        deleteAllLogs()
        saveConfiguration(null)
    }

    companion object {
        private const val DATABASE_NAME: String = "logs"
        private const val CONFIGURATION_COLLECTION_NAME: String = "config"
        private const val STATS_COMMAND: String = "collStats"
        private const val STATS_SIZE: String = "size"
        private const val MB_TO_BYTES: Long = 1024L * 1024L
        private const val DAY_TO_TIMESTAMP = 24 * 60 * 60
        private var mongoClient: MongoClient? = null

        /** Returns a shared instance of the Mongo client. */
        private val client: MongoClient?
        get() {
            if (mongoClient != null) {
                return mongoClient
            }
            try {
                mongoClient = MongoClients.create("mongodb://root:root@mongo:27017/")
                return mongoClient
            } catch (exception: MongoException) {
                LOGGER.error("Cannot create a mongo client: $exception")
            }
            return null
        }

        /** Returns a database for storing logs and collection configurations. */
        private val database: MongoDatabase?
        get() = client?.getDatabase(DATABASE_NAME)

        /** Returns a configuration collection. */
        val configCollection: MongoCollection<Document>?
        get() = database?.getCollection(CONFIGURATION_COLLECTION_NAME)

        private val LOGGER: Logger = LoggerFactory.getLogger(LogStorage::class.java)
    }
}
