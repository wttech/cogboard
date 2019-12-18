package com.cognifide.cogboard.config.handler

import io.vertx.reactivex.ext.web.RoutingContext

class HandlerUtil {
    companion object {
        fun endResponse(body: String, routingContext: RoutingContext) {
            routingContext.response()
                    .putHeader("Content-Type", "application/json")
                    .end(body)
        }
    }
}
