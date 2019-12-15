package com.cognifide.cogboard.config.handler

import com.cognifide.cogboard.config.handler.HandlerUtil.Companion.endResponse
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.MultiMap
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class ConfigApiHandler : RoutingHandlerFactory {
    override fun getName(): String = "config-api-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        vertx?.eventBus()
                ?.rxSend<String>(toAddress(config), buildControllerBody(event, config))
                ?.subscribe { response -> endResponse(response.body(), event) }
    }

    private fun buildControllerBody(ctx: RoutingContext, config: JsonObject?): JsonObject? {
        val params = ctx.request().params()
        val payload = if (config?.getString("payload") == "params") fromParam(params) else ctx.bodyAsJson
        return toControllerBody(config, payload)
    }

    private fun fromParam(params: MultiMap): JsonObject {
        val body = JsonObject()
        if (params.contains("id"))body.put("id", params["id"])
        return body
    }

    private fun toAddress(config: JsonObject?) = config?.getString("address")

    private fun toControllerBody(config: JsonObject?, handlerBody: JsonObject): JsonObject {
        return JsonObject()
                .put("method", config?.getString("method"))
                .put("payload", handlerBody)
    }
}
