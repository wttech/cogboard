package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var storage: Storage

    override fun start() {
        storage = VolumeStorage(ConfigType.ENDPOINTS, vertx)
        listenOnEndpointsUpdate()
        listenOnEndpointsDelete()
    }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS_CONFIG)
            .handler {
                EndpointsService(config()).save(it.body())
                storage.saveConfig(config())
            }

    private fun listenOnEndpointsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_ENDPOINTS_CONFIG)
            .handler {
                EndpointsService(config()).delete(it.body())
                storage.saveConfig(config())
            }
}