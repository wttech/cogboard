package com.cognifide.cogboard.config.handler.boards

import com.cognifide.cogboard.config.service.BoardsAndWidgetsService
import com.cognifide.cogboard.http.HttpConstants
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetBoards : RoutingHandlerFactory {

    override fun getName(): String = "boards-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        return Handler {
            val service = BoardsAndWidgetsService()
            val boardsConfig: JsonObject = service.loadBoardsConfig()
            it.response()
                    .putHeader(HttpConstants.HEADER_CONTENT_TYPE, HttpConstants.CONTENT_TYPE_JSON)
                    .end(boardsConfig.toString())
        }
    }
}
