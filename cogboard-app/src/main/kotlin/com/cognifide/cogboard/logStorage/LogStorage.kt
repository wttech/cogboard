package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import com.cognifide.cogboard.widget.type.logviewer.logparser.LogParserStrategy
import com.mongodb.client.MongoClient
import com.mongodb.MongoException
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Filters.lt
import com.mongodb.client.model.Filters.`in`
import com.mongodb.client.model.Filters.regex
import com.mongodb.client.model.Filters.or
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
import main.kotlin.com.cognifide.cogboard.logStorage.LogVariableData
import main.kotlin.com.cognifide.cogboard.logStorage.QuarantineRule
import java.net.URI
import java.time.Instant

class LogStorage(
    private val config: LogStorageConfiguration,
    private val connection: ConnectionStrategy,
    private val parserStrategy: LogParserStrategy,
    var rules: List<QuarantineRule> = emptyList()
) : AbstractVerticle() {

    /** Returns the list of regexes of enabled rules. */
    private val enabledRegexes: List<Regex>
    get() = rules.filter { it.enabled }.map { it.regex }

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

    /** Filters in place the logs not matching the rules. */
    private fun filter(logs: MutableList<Log>) {
        val regexes = enabledRegexes
        if (regexes.isEmpty()) { return }
        logs.removeAll { log ->
            log.variableData.any { variable ->
                regexes.any { it.containsMatchIn(variable.header) }
            }
        }
    }

    /** Deletes logs not matching to the rules from the database. */
    fun filterExistingLogs() {
        val collection = logsCollection ?: return

        val fieldName = Log.VARIABLE_DATA + "." + LogVariableData.HEADER
        val regexes = enabledRegexes.map { regex(fieldName, it.pattern) }

        if (regexes.isEmpty()) { return }

        collection.deleteMany(or(regexes))
    }

    /** Downloads new logs and inserts the to the database. Returns the number of inserted logs. */
    private fun downloadInsertLogs(seq: Long, skipFirstLines: Long? = null): Long {
        var sequence = seq
        val logs = connection
                .getLogs(skipFirstLines)
                .mapNotNull { parserStrategy.parseLine(it) }
                .toMutableList()

        // Filter the logs by quarantine rules
        filter(logs)
        logs.forEach {
            it.seq = sequence
            sequence += 1
        }

        logsCollection?.insertMany(logs.map { it.toDocument() })

        return logs.size.toLong()
    }

    /** Checks how many logs to download, downloads them and saves them to the database. */
    private fun downloadLogs() {
        // Get the current settings
        val storageConfig = collectionConfiguration
        var lastLine = storageConfig?.lastLine ?: 0
        var seq = storageConfig?.seq ?: 0

        // Get the number of lines in the file
        val fileLineCount = connection.getNumberOfLines() ?: 0

        if (fileLineCount > 0 && fileLineCount > lastLine) {
            // Download new logs and append them
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

        // Save the new configuration
        saveConfiguration(LogCollectionConfiguration(config.id, lastLine, seq))
    }

    /** Returns all logs for this instance, sorted by their sequence number. */
    private val logs: List<Log>
    get() = logsCollection
            ?.find()
            ?.limit(config.logLines.toInt())
            ?.sort(descending(Log.SEQ))
            ?.mapNotNull { it }
            ?.mapNotNull { Log.from(it) }
            ?: emptyList()

    /** Prepares a JSON response to be displayed */
    private fun prepareResponse(): JsonObject {
        return JsonObject(mapOf(
            "variableFields" to parserStrategy.variableFields,
            "logs" to JsonArray(logs.map { it.toJson() })
        ))
    }

    /** Updates the logs and sends them to the widget. */
    fun updateLogs(fetchNewLogs: Boolean) {
        if (fetchNewLogs) {
            // Download new logs
            downloadLogs()

            // Delete unnecessary logs
            deleteOldLogs()
            deleteSpaceConsumingLogs()
        }

        // Fetch the logs from the database and send them back
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
        private const val MONGO_SCHEME = "mongodb"
        private val MONGO_USERNAME = System.getenv("MONGO_USERNAME") ?: "root"
        private val MONGO_PASSWORD = System.getenv("MONGO_PASSWORD") ?: "root"
        private val MONGO_HOST = System.getenv("MONGO_HOST") ?: "mongo"
        private val MONGO_PORT = System.getenv("MONGO_PORT")?.toIntOrNull() ?: 27017
        private var mongoClient: MongoClient? = null

        /** Returns a shared instance of the Mongo client. */
        private val client: MongoClient?
        get() {
            if (mongoClient != null) {
                return mongoClient
            }
            try {
                val uri = URI(
                        MONGO_SCHEME,
                        "$MONGO_USERNAME:$MONGO_PASSWORD",
                        MONGO_HOST,
                        MONGO_PORT,
                        null,
                        null,
                        null
                )
                mongoClient = MongoClients.create(uri.toString())
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
