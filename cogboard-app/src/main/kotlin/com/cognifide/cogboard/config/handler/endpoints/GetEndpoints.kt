package com.cognifide.cogboard.config.handler.endpoints

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINTS_ARRAY
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.PASSWORD_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.USER_PROP
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.http.HttpConstants
import com.cognifide.cogboard.storage.VolumeStorageFactory.endpoints
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetEndpoints : RoutingHandlerFactory {

    private val service = EndpointsService(endpoints())

    override fun getName(): String = "endpoints-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        val endpointId = event.request().getParam(PARAM_ENDPOINT_ID)
        val response = if (endpointId != null) getEndpointById(endpointId) else getAllEndpoints()
        event.response()
                .putHeader(HttpConstants.HEADER_CONTENT_TYPE, HttpConstants.CONTENT_TYPE_JSON)
                .end(response)
    }

    private fun getEndpointById(endpointId: String): String {
        val endpoint: JsonObject =
                JsonArray(getAllEndpoints()).getById(endpointId)
                        ?: JsonObject().put(ERROR_MESSAGE, "Endpoint with ID $endpointId doesn't exist")
        return endpoint.encode()
    }

    private fun JsonArray.getById(id: String): JsonObject? {
        return this.map { it as JsonObject }
                .filter { it.getValue(ENDPOINT_ID_PROP) == id }
                .getOrNull(0)
    }

    private fun getAllEndpoints(): String {
        val endpointsConfig = service.loadConfig()
        val endpointsWithoutSensitiveData = filterSensitiveData(endpointsConfig)
        return endpointsWithoutSensitiveData.encode()
    }

    private fun filterSensitiveData(config: JsonObject): JsonArray {
        val copy = config.getJsonArray(ENDPOINTS_ARRAY)
                ?: JsonArray().add(CogboardConstants.errorResponse("No endpoints array found, $config"))
        copy.stream().forEach {
            if (it is JsonObject) {
                it.filterSensitiveData()
            }
        }
        return copy
    }

    private fun JsonObject.filterSensitiveData() {
        this.remove(USER_PROP)
        this.remove(PASSWORD_PROP)
    }

    companion object {
        private const val ERROR_MESSAGE: String = "error"
        internal const val PARAM_ENDPOINT_ID: String = "id"
    }
}
