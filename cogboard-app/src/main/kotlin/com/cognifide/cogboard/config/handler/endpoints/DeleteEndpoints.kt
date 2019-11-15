package com.cognifide.cogboard.config.handler.endpoints

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.handler.endpoints.GetEndpoints.Companion.PARAM_ENDPOINT_ID
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class DeleteEndpoints : RoutingHandlerFactory {

    override fun getName(): String = "endpoints-delete-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        val endpointId: String = event.request()
                                                .params()
                                                .get(PARAM_ENDPOINT_ID)
        vertx
                ?.eventBus()
                ?.publish(CogboardConstants.EVENT_DELETE_ENDPOINTS, JsonObject().put(ENDPOINT_ID_PROP, endpointId))
        event
                .response()
                .end(config?.getJsonObject("body", CogboardConstants.errorResponse())?.encode())
    }
}
