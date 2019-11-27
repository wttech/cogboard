package com.cognifide.cogboard.config.handler.boards

import com.cognifide.cogboard.storage.docker.VolumeStorage
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetBoards : RoutingHandlerFactory {

    override fun getName(): String = "boards-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler {
        it.response().end(VolumeStorage.Loader().loadBoardsConfig().toString())
    }
}
