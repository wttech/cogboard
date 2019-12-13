package com.cognifide.cogboard.config.handler

import io.vertx.core.json.JsonObject
import io.vertx.reactivex.ext.web.RoutingContext

class HandlerUtil {
    companion object {
        fun endResponse(body: JsonObject, routingContext: RoutingContext) {
            routingContext.response()
                    .putHeader("Content-Type", "application/json")
                    .end(body.toString())
        }
    }
}
