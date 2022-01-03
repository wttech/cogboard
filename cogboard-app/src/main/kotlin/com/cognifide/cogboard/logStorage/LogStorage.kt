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
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.client.model.Sorts.ascending
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import org.bson.Document
import com.cognifide.cogboard.logStorage.model.Log
import com.cognifide.cogboard.logStorage.model.LogStorageConfiguration
import com.cognifide.cogboard.logStorage.model.LogVariableData
import com.cognifide.cogboard.logStorage.model.QuarantineRule
import com.cognifide.cogboard.logStorage.model.LogCollectionConfiguration
import io.vertx.kotlin.coroutines.CoroutineVerticle
import kotlinx.coroutines.runBlocking
import java.net.URI
import java.time.Instant

class LogStorage(
    private val storageConfig: LogStorageConfiguration,
    private val connection: ConnectionStrategy,
    private val parserStrategy: LogParserStrategy,
    var rules: List<QuarantineRule> = emptyList()
) : CoroutineVerticle() {

    /** Returns the list of regexes of enabled rules. */
    private val enabledRegexes: List<Regex>
    get() = rules.filter { it.enabled }.map { it.regex }

    val deploymentId: String
    get() = deploymentID

    override suspend fun start() {
        super.start()
        logsCollection?.createIndex(Indexes.descending(Log.SEQ))
    }

    /** Returns a logs collection associated with this widget. */
    private val logsCollection: MongoCollection<Document>?
    get() = database?.getCollection(storageConfig.id)

    // Storage configuration

    /** Returns a logs collection configuration associated with this widget (if present). */
    private val collectionConfiguration: LogCollectionConfiguration?
    get() = configCollection
            ?.find(eq(Log.ID, storageConfig.id))
            ?.first()
            ?.let { LogCollectionConfiguration.from(it) }

    /** Saves or deletes a logs collection [configuration] associated with this widget. */
    private fun saveConfiguration(configuration: LogCollectionConfiguration?) {
        if (configuration != null) {
            val options = ReplaceOptions().upsert(true)
            configCollection
                    ?.replaceOne(
                            eq(LogCollectionConfiguration.ID, storageConfig.id),
                            configuration.toDocument(),
                            options
                    )
        } else {
            configCollection?.deleteOne((eq(LogCollectionConfiguration.ID, storageConfig.id)))
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
        val beforeTimestamp = now - (storageConfig.expirationDays * DAY_TO_TIMESTAMP)
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
                .runCommand(Document(STATS_COMMAND, storageConfig.id))
                .getInteger(STATS_SIZE) ?: 0
        val maxSize = storageConfig.fileSizeMB * MB_TO_BYTES
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

    /** Downloads new logs and filters them by quarantine rules. */
    private fun downloadFilterLogs(skipFirstLines: Long? = null): List<Log> {
        val logs = mutableListOf<Log>()
        runBlocking {
            logs.addAll(connection
                    .getLogs(skipFirstLines)
                    .mapNotNull { parserStrategy.parseLine(it) }
            )

            // Filter the logs by quarantine rules
            filter(logs)
        }
        return logs
    }

    /** Inserts the logs to the database. */
    private fun insertLogs(seq: Long, logs: Collection<Log>) {
        if (logs.isEmpty()) return

        var sequence = seq

        logs.forEach {
            it.seq = sequence
            sequence += 1
        }

        logsCollection?.insertMany(logs.map { it.toDocument() })
    }

    /** Checks how many logs to download, downloads them and saves them to the database. */
    private fun downloadLogs(): List<Log> {
        // Get the current settings
        val storageConfig = collectionConfiguration
        var lastLine = storageConfig?.lastLine ?: 0
        var seq = storageConfig?.seq ?: 0
        var newLogs: List<Log> = emptyList()

        // Get the number of lines in the file
        var fileLineCount: Long = 0
        runBlocking {
            fileLineCount = connection.getNumberOfLines() ?: 0
        }

        if (fileLineCount > 0 && fileLineCount > lastLine) {
            // Download new logs and append them
            newLogs = downloadFilterLogs(lastLine)
        } else if (fileLineCount in 1 until lastLine) {
            // Remove all logs and download from the beginning
            deleteAllLogs()
            seq = 0
            lastLine = 0
            newLogs = downloadFilterLogs()
        }

        insertLogs(seq, newLogs)
        lastLine += newLogs.size
        seq += newLogs.size

        // Save the new configuration
        saveConfiguration(LogCollectionConfiguration(this.storageConfig.id, lastLine, seq))

        return newLogs
    }

    /** Prepares a JSON response to be displayed. */
    private fun prepareResponse(insertedLogs: List<Log>): JsonObject {
        return JsonObject(mapOf(
            "variableFields" to parserStrategy.variableFields,
            "logs" to JsonArray(insertedLogs.map { it.toJson() })
        ))
    }

    /** Updates the logs and sends them to the widget. */
    fun updateLogs(fetchNewLogs: Boolean) {
        var insertedLogs: List<Log> = emptyList()

        if (fetchNewLogs) {
            // Download new logs
            insertedLogs = downloadLogs()

            // Delete unnecessary logs
            deleteOldLogs()
            deleteSpaceConsumingLogs()
        }

        // Fetch the logs from the database and send them back
        val response = prepareResponse(insertedLogs)
        vertx?.eventBus()?.send(storageConfig.eventBusAddress, response)
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
        val database: MongoDatabase?
        get() = client?.getDatabase(DATABASE_NAME)

        /** Returns a configuration collection. */
        val configCollection: MongoCollection<Document>?
        get() = database?.getCollection(CONFIGURATION_COLLECTION_NAME)

        private val LOGGER: Logger = LoggerFactory.getLogger(LogStorage::class.java)
    }
}
