package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.storage.VolumeStorageFactory.endpoints
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var endpointsService: EndpointsService
    private val factory = ControllerFactory()

    override fun start() {
        endpointsService = EndpointsService(endpoints())
        factory.create(CogboardConstants.EVENT_ENDPOINTS, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "update" to { body -> endpointsService.save(body).encode() },
            "delete" to { body -> delete(body) },
            "get" to { body -> get(body) }
    )

    private fun delete(body: JsonObject): String {
        endpointsService.delete(body.getString(ENDPOINT_ID_PROP))
        return body.encode()
    }

    private fun get(body: JsonObject) =
        if (body.containsKey(ENDPOINT_ID_PROP)) {
            endpointsService.getEndpoint(body.getString(ENDPOINT_ID_PROP)).encode()
        } else {
            endpointsService.getAllEndpoints().encode()
        }
}
