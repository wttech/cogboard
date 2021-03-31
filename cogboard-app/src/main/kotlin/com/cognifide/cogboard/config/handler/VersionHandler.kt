package com.cognifide.cogboard.config.handler

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.utils.ExtensionFunctions.endEmptyJson
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class VersionHandler : RoutingHandlerFactory {

    override fun getName(): String = "version-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx
                ?.eventBus()
                ?.publish(CogboardConstants.Event.VERSION_CONFIG, JsonObject())
        event
                .response()
                .endEmptyJson()
    }
}
