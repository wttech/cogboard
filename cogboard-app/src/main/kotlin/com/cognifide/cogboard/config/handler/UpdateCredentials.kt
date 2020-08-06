package com.cognifide.cogboard.config.handler

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
                ?.publish(CogboardConstants.EVENT_UPDATE_CREDENTIALS, event.body.toJsonObject())
        event
                .response()
                .end(config?.getJsonObject("body", DEFAULT_NO_BODY)?.encode())
    }

    companion object {
        val DEFAULT_NO_BODY: JsonObject = JsonObject().put("status", "failed")
    }
}
