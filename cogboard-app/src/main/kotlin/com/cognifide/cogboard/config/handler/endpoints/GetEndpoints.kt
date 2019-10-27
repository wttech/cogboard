package com.cognifide.cogboard.config.handler.endpoints

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigLoader
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.EndpointLoader.Companion.CREDENTIALS
import com.cognifide.cogboard.config.type.EndpointsConfig.Companion.ENDPOINTS_ARRAY
import com.cognifide.cogboard.config.type.EndpointsConfig.Companion.ENDPOINT_PUBLIC_URL_PROP
import com.cognifide.cogboard.config.type.EndpointsConfig.Companion.ENDPOINT_URL_PROP
import com.cognifide.cogboard.config.type.EndpointsConfig.Companion.PASSWORD
import com.cognifide.cogboard.config.type.EndpointsConfig.Companion.USER
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetEndpoints : RoutingHandlerFactory {

    private lateinit var endpoints: JsonArray

    override fun getName(): String = "endpoints-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        val endpointsConfig = ConfigLoader.loadConfig(ConfigType.ENDPOINTS)
        endpoints = filterSensitiveData(endpointsConfig)

        event.response().end(endpoints.encode())
    }

    private fun filterSensitiveData(config: JsonObject?): JsonArray {
        val copy = config?.getJsonArray(ENDPOINTS_ARRAY)
                ?: JsonArray().add(CogboardConstants.errorResponse("No endpoints array found, $config"))
        copy.stream().forEach {
            if (it is JsonObject) {
                it.remove(ENDPOINT_URL_PROP)
                it.remove(ENDPOINT_PUBLIC_URL_PROP)
                it.remove(CREDENTIALS)
                it.remove(USER)
                it.remove(PASSWORD)
            }
        }
        return copy
    }

}