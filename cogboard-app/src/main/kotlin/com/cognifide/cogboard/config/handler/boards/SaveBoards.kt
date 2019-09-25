package com.cognifide.cogboard.config.handler.boards

import com.cognifide.cogboard.CogboardConstants
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class SaveBoards : RoutingHandlerFactory {

    override fun getName(): String = "boards-save-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx
                ?.eventBus()
                ?.publish(CogboardConstants.EVENT_SAVE_BOARDS_CONFIG, event.body.toJsonObject())
        event
                .response()
                .end(config?.getJsonObject("body", CogboardConstants.errorResponse())?.encode())
    }

}