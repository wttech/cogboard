package com.cognifide.cogboard.config.handler

import com.cognifide.cogboard.config.handler.HandlerUtil.Companion.endResponse
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class UpdateHandler : RoutingHandlerFactory {
    override fun getName(): String = "update-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx?.eventBus()
                ?.rxSend<JsonObject>(config?.getString("address"), event.bodyAsJson)
                ?.subscribe { response -> endResponse(response.body(), event) }
    }
}
