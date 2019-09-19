package com.cognifide.cogboard.config.handler.endpoints

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.endpoints.EndpointLoader
import com.cognifide.cogboard.storage.docker.VolumeStorage
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetEndpoints : RoutingHandlerFactory {

    private lateinit var endpoints: JsonArray

    override fun getName(): String = "endpoints-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        val endpointsConfig = VolumeStorage.Loader()
                .loadEndpointsConfig()
        endpoints = filterSensitiveData(endpointsConfig)

        event.response().end(endpoints.encode())
    }

    private fun filterSensitiveData(config: JsonObject?): JsonArray {
        val copy = config?.getJsonArray(EndpointLoader.ENDPOINTS) ?: JsonArray().add(CogboardConstants.errorResponse("No endpoints array found, $config"))
        copy.stream().forEach {
            if (it is JsonObject) {
                it.remove("url")
                it.remove("publicUrl")
                it.remove("credentials")
                it.remove("user")
                it.remove("password")
            }
        }
        return copy
    }

}