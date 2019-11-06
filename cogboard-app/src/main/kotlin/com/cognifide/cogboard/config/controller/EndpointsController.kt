package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var endpointsService: EndpointsService

    override fun start() {
        endpointsService = EndpointsService(config(), vertx)
        listenOnEndpointsUpdate()
        listenOnEndpointsDelete()
    }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS_CONFIG)
            .handler {
                endpointsService.save(it.body())
            }

    private fun listenOnEndpointsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_ENDPOINTS_CONFIG)
            .handler {
                endpointsService.delete(it.body())
            }
}