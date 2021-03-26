package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.service.EndpointsService
import com.cognifide.cogboard.utils.ExtensionFunctions.findAllByKeyValue
import io.vertx.core.AbstractVerticle
import io.vertx.core.eventbus.Message
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var endpointsService: EndpointsService
    private val factory = ControllerFactory()

    override fun start() {
        endpointsService = EndpointsService()
        factory.create(CogboardConstants.EVENT_ENDPOINTS, vertx, prepareConfig())

        listenOnCredentialsUpdate()
        listenOnEndpointsUpdate()
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "get" to { body -> get(body) },
            "update" to { body -> update(body) },
            "delete" to { body -> delete(body) }
    )

    private fun get(body: JsonObject) =
            if (body.containsKey(ENDPOINT_ID_PROP)) {
                endpointsService.getEndpoint(body.getString(ENDPOINT_ID_PROP)).encode()
            } else {
                endpointsService.getAllEndpoints().encode()
            }

    private fun update(body: JsonObject): String {
        val saved = endpointsService.save(body)
        return saved.encode()
    }

    private fun delete(body: JsonObject): String {
        endpointsService.delete(body.getString(ENDPOINT_ID_PROP))
        return body.encode()
    }

    private fun listenOnCredentialsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_CREDENTIALS)
            .handler {
                val relatedEndpoints = endpointsWithChangedCredentials(it)
                val message = JsonObject().put(CogboardConstants.PROP_ENDPOINTS, relatedEndpoints)
                vertx.eventBus().send(CogboardConstants.EVENT_REFRESH_WIDGET_CONFIG, message)
            }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS)
            .handler {
                val message = JsonObject().put(CogboardConstants.PROP_ENDPOINTS, JsonArray().add(it.body()))
                vertx.eventBus().send(CogboardConstants.EVENT_REFRESH_WIDGET_CONFIG, message)
            }

    private fun endpointsWithChangedCredentials(it: Message<JsonObject>): List<JsonObject>? {
        val changedCredentialId = it.body().getString(CogboardConstants.PROP_ID)
        return changedCredentialId
                ?.let { id ->
                    endpointsService.getAllEndpoints().findAllByKeyValue(id, CogboardConstants.PROP_CREDENTIALS)
                }
    }
}
