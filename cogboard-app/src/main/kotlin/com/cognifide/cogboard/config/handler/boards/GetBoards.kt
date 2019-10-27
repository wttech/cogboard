package com.cognifide.cogboard.config.handler.boards

import com.cognifide.cogboard.config.ConfigLoader
import com.cognifide.cogboard.config.ConfigType
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetBoards : RoutingHandlerFactory {

    override fun getName(): String = "boards-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler {
        val boardsConfig = ConfigLoader(ConfigType.BOARDS).loadConfig()
        it.response().end(boardsConfig.toString())
    }
}