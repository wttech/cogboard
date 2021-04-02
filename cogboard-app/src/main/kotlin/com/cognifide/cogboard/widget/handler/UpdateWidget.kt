package com.cognifide.cogboard.widget.handler

import com.cognifide.cogboard.CogboardConstants
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class UpdateWidget : RoutingHandlerFactory {

    override fun getName(): String = "widget-update-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx
                ?.eventBus()
                ?.publish(CogboardConstants.Event.UPDATE_WIDGET_CONFIG, event.body.toJsonObject())
        event.reroute("/api/session/refresh")
    }
}
