package com.cognifide.cogboard.config.handler

import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class EndpointsHandler : RoutingHandlerFactory {

    private lateinit var endpoints: JsonArray

    override fun getName(): String = "endpoints-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        endpoints = filterSensitiveData(config)
        return Handler { it.response().end(endpoints.encode()) }
    }

    private fun filterSensitiveData(config: JsonObject?): JsonArray {
        val copy = config?.getJsonArray("endpoints") ?: DEFAULT_NO_BODY.copy()
        copy.stream().forEach {
            if (it is JsonObject) {
                it.remove("publicUrlTemplate")
                it.remove("privateUrlTemplate")
                it.remove("user")
                it.remove("password")
            }
        }
        return copy
    }

    companion object {
        val DEFAULT_NO_BODY: JsonArray = JsonArray().add(JsonObject().put("status", "failed"))
    }
}