package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.storage.VolumeStorageFactory.endpoints
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var endpointsService: EndpointsService

    override fun start() {
        endpointsService = EndpointsService(endpoints())
        listenOnEndpointsUpdate()
        listenOnEndpointsDelete()
    }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS)
            .handler {
                endpointsService.save(it.body())
            }

    private fun listenOnEndpointsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_ENDPOINTS)
            .handler {
                val endpointId: String = it.body().getString(ENDPOINT_ID_PROP)
                endpointsService.delete(endpointId)
            }
}
