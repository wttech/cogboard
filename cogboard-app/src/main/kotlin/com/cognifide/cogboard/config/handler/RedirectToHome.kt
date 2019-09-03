package com.cognifide.cogboard.config.handler

import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class RedirectToHome : RoutingHandlerFactory {

    override fun getName(): String = "cogboard-redirect-home-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        val homePath = config?.getString("homePath") ?: "/index.html"
        return Handler {
            it.response()
                    .putHeader("location", homePath)
                    .setStatusCode(302)
                    .end()
        }
    }

}