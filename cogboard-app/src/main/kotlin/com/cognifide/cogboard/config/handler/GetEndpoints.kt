package com.cognifide.cogboard.config.handler

import com.cognifide.cogboard.CogboardConstants
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetEndpoints : RoutingHandlerFactory {

    private lateinit var endpoints: JsonArray

    override fun getName(): String = "endpoints-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        endpoints = filterSensitiveData(config)
        return Handler { it.response().end(endpoints.encode()) }
    }

    private fun filterSensitiveData(config: JsonObject?): JsonArray {
        val copy = config?.getJsonArray("endpoints") ?: JsonArray().add(CogboardConstants.errorResponse("No endpoints array found"))
        copy.stream().forEach {
            if (it is JsonObject) {
                it.remove("url")
                it.remove("user")
                it.remove("password")
            }
        }
        return copy
    }

}