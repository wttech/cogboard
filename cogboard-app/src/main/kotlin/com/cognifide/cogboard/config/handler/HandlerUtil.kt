package com.cognifide.cogboard.config.handler

import io.vertx.core.http.HttpMethod
import io.vertx.reactivex.ext.web.RoutingContext

class HandlerUtil {
    companion object {
        fun endResponse(body: String, routingContext: RoutingContext) {
            if (SESSION_REFRESHERS.contains(routingContext.request().method())) {
                routingContext.request().headers().add("body", body)
                routingContext.reroute(HttpMethod.POST, "/api/session/refresh")
            } else routingContext.response()
                .putHeader("Content-Type", "application/json")
                .end(body)
        }

        val SESSION_REFRESHERS = setOf(HttpMethod.POST, HttpMethod.DELETE)
    }
}
