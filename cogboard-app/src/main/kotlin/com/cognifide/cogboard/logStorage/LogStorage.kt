package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.logStorage.model.Log
import com.cognifide.cogboard.logStorage.model.LogCollectionState
import com.cognifide.cogboard.logStorage.model.asLogCollectionState
import com.cognifide.cogboard.logStorage.model.LogStorageConfiguration
import com.cognifide.cogboard.logStorage.model.LogVariableData
import com.cognifide.cogboard.logStorage.model.QuarantineRule
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
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import org.bson.Document
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
        logsCollection.createIndex(Indexes.descending(Log.SEQ))
    }

    /** Returns a logs collection associated with this widget. */
    private val logsCollection: MongoCollection<Document>
    get() = database.getCollection(config.id)

    // Storage configuration

    /** Returns a logs collection configuration associated with this widget (if present). */
    private val collectionState: LogCollectionState?
    get() = stateCollection
            .find(eq(Log.ID, config.id))
            .first()
            ?.asLogCollectionState()

    /** Saves or deletes a logs collection [state] associated with this widget. */
    private fun saveState(state: LogCollectionState?) {
        if (state != null) {
            val options = ReplaceOptions().upsert(true)
            stateCollection
                    .replaceOne(
                            eq(LogCollectionState.ID, config.id),
                            state.toDocument(),
                            options
                    )
        } else {
            stateCollection.deleteOne((eq(LogCollectionState.ID, config.id)))
        }
    }

    // MongoDB - logs

    /** Deletes all logs from the collection. */
    private fun deleteAllLogs() {
        logsCollection.drop()
    }

    /** Deletes the [n] first logs (ordered by their sequence number). */
    private fun deleteFirstLogs(n: Long) {
        val ids = logsCollection
                .find()
                .sort(ascending(Log.SEQ))
                .limit(n.toInt())
                .map { it.getObjectId(Log.ID) }
                .toList()
        if (ids.isNotEmpty()) {
            try {
                val result = logsCollection.deleteMany(`in`(Log.ID, ids))
                LOGGER.debug("Deleted ${result.deletedCount} first logs")
            } catch (exception: MongoException) {
                LOGGER.error("Cannot delete first logs: $exception")
            }
        }
    }

    /** Deletes old logs (based on the number of days before expiration). */
    private fun deleteOldLogs() {
        val now = Instant.now().epochSecond
        val beforeTimestamp = now - (config.expirationDays * DAY_TO_TIMESTAMP)
        try {
            val result = logsCollection.deleteMany(lt(Log.INSERTED_ON, beforeTimestamp))
            LOGGER.debug("Deleted ${result.deletedCount} old logs")
        } catch (exception: MongoException) {
            LOGGER.error("Cannot delete old logs: $exception")
        }
    }

    /** Deletes oldest logs when logs take up too much space. */
    private fun deleteSpaceConsumingLogs() {
        val size = database
                .runCommand(Document(STATS_COMMAND, config.id))
                .getInteger(STATS_SIZE)
        val maxSize = config.fileSizeMB * MB_TO_BYTES
        if (size > 0 && size > maxSize) {
            val deleteFactor = ((size - maxSize).toDouble() / size)
            val logCount = logsCollection.countDocuments()
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
        val fieldName = Log.VARIABLE_DATA + "." + LogVariableData.HEADER
        val regexes = enabledRegexes.map { regex(fieldName, it.pattern) }

        if (regexes.isEmpty()) { return }

        logsCollection.deleteMany(or(regexes))
    }

    /** Downloads new logs and filters them by quarantine rules. */
    private fun downloadFilterLogs(skipFirstLines: Long? = null): List<Log> {
        val logs = connection
                .getLogs(skipFirstLines)
                .mapNotNull { parserStrategy.parseLine(it) }
                .toMutableList()

        filter(logs)

        return logs
    }

    /** Inserts the logs to the database. */
    private fun insertLogs(seq: Long, logs: Collection<Log>) {
        if (logs.isEmpty()) return

        var sequence = seq

        logs.forEach {
            it.seq = sequence
            sequence++
        }

        logsCollection.insertMany(logs.map { it.toDocument() })
    }

    /** Checks how many logs to download, downloads them and saves them to the database. */
    private fun downloadLogs(): List<Log> {
        var lastLine = collectionState?.lastLine ?: 0
        var seq = collectionState?.seq ?: 0
        var newLogs: List<Log> = emptyList()

        val fileLineCount = connection.getNumberOfLines() ?: 0

        if (fileLineCount > 0 && fileLineCount > lastLine) {
            newLogs = downloadFilterLogs(lastLine)
        } else if (fileLineCount in 1 until lastLine) {
            deleteAllLogs()
            seq = 0
            lastLine = 0
            newLogs = downloadFilterLogs()
        }

        insertLogs(seq, newLogs)
        lastLine += newLogs.size
        seq += newLogs.size

        saveState(LogCollectionState(config.id, lastLine, seq))

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
            insertedLogs = downloadLogs()

            deleteOldLogs()
            deleteSpaceConsumingLogs()
        }

        val response = prepareResponse(insertedLogs)
        vertx.eventBus().send(config.eventBusAddress, response)
    }

    /** Deletes all data associated with the widget. */
    fun delete() {
        deleteAllLogs()
        saveState(null)
    }

    companion object {
        private const val DATABASE_NAME: String = "logs"
        private const val STATE_COLLECTION_NAME: String = "config"
        private const val STATS_COMMAND: String = "collStats"
        private const val STATS_SIZE: String = "size"
        private const val MB_TO_BYTES: Long = 1024L * 1024L
        private const val DAY_TO_TIMESTAMP = 24 * 60 * 60
        private const val MONGO_SCHEME = "mongodb"
        private val MONGO_USERNAME = System.getenv("MONGO_USERNAME") ?: "root"
        private val MONGO_PASSWORD = System.getenv("MONGO_PASSWORD") ?: "root"
        private val MONGO_HOST = System.getenv("MONGO_HOST") ?: "mongo"
        private val MONGO_PORT = System.getenv("MONGO_PORT")?.toIntOrNull() ?: 27017

        /** Returns a shared instance of the Mongo client. */
        private val mongoClient: MongoClient by lazy {
            val uri = URI(
                    MONGO_SCHEME,
                    "$MONGO_USERNAME:$MONGO_PASSWORD",
                    MONGO_HOST,
                    MONGO_PORT,
                    null,
                    null,
                    null
            )
            MongoClients.create(uri.toString())
        }

        /** Returns a database for storing logs and collection states. */
        val database: MongoDatabase
        get() = mongoClient.getDatabase(DATABASE_NAME)

        /** Returns a state collection. */
        val stateCollection: MongoCollection<Document>
        get() = database.getCollection(STATE_COLLECTION_NAME)

        private val LOGGER: Logger = LoggerFactory.getLogger(LogStorage::class.java)
    }
}
