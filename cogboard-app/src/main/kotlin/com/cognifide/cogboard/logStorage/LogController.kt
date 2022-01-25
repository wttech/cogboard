package com.cognifide.cogboard.logStorage

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.logStorage.model.Log
import com.cognifide.cogboard.logStorage.model.asLog
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import com.cognifide.cogboard.widget.type.logviewer.LogViewerWidget
import com.mongodb.client.model.Sorts
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext
import java.time.Instant

class LogController : RoutingHandlerFactory {

    override fun getName(): String = "logs-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { context ->
        context?.request()?.params()?.get("id")?.let { id ->
            val logs = JsonArray(getLogs(id).map { it.toJson() })
            context.response().end(logs.encode())
        }
    }

    private fun getLogs(id: String): List<Log> {
        val logLines = boards()
                .loadConfig()
                .getJsonObject(Props.WIDGETS)
                .getJsonObject(Props.WIDGETS_BY_ID)
                .getJsonObject(id)
                .getInteger(Props.LOG_LINES)
                ?: LogViewerWidget.DEFAULT_LOG_LINES.toInt()

        return if (LOGGER.isDebugEnabled) {
            val start = Instant.now()
            val logs = fetchLogs(id, logLines)
            val took = Instant.now().minusMillis(start.toEpochMilli()).toEpochMilli()
            LOGGER.debug("DB query for $id took $took[ms] for getting $logLines (processed logs: ${logs.size})")
            logs
        } else {
            fetchLogs(id, logLines)
        }
    }

    private fun fetchLogs(id: String, logLines: Int): List<Log> {
        return LogStorage.database
                .getCollection(id)
                .find()
                .sort(Sorts.descending(Log.SEQ))
                .limit(logLines)
                .map { it.asLog() }
                .sortedBy { it.seq }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(LogController::class.java)
    }
}
