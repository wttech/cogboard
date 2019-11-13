package com.cognifide.cogboard.config.handler.credentials

import com.cognifide.cogboard.CogboardConstants
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class UpdateCredentials : RoutingHandlerFactory {

    override fun getName(): String = "credentials-update-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx
                ?.eventBus()
                ?.publish(CogboardConstants.EVENT_UPDATE_CREDENTIALS, event.bodyAsJson)
        event
                .response()
                .end(config?.getJsonObject("body", CogboardConstants.errorResponse())?.encode())
    }
}