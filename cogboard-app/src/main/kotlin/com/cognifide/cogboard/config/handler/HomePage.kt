package com.cognifide.cogboard.config.handler

import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class HomePage : RoutingHandlerFactory {

    override fun getName(): String = "home-page-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        val homePath = config?.getString("homePath") ?: "/index.html"
        val homePageContent = HomePage::class.java.getResource(homePath).readText()

        return Handler {
            it.response()
                    .end(homePageContent)
        }
    }
}
