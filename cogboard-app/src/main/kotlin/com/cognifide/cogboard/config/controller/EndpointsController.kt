package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.config.EndpointLoader.Companion.ENDPOINTS
import com.cognifide.cogboard.config.EndpointLoader.Companion.ENDPOINT_ID_PREFIX
import com.cognifide.cogboard.config.EndpointLoader.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.EndpointLoader.Companion.ENDPOINT_LABEL_PROP
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.docker.VolumeStorage
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsController : AbstractVerticle() {

    private lateinit var storage: Storage

    override fun start() {
        storage = VolumeStorage(vertx)
        listenOnEndpointsUpdate()
        listenOnEndpointsDelete()
    }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS_CONFIG)
            .handler {
                save(it.body())
                storage.saveEndpointsConfig(config())
            }

    private fun listenOnEndpointsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_ENDPOINTS_CONFIG)
            .handler {
                delete(it.body())
                storage.saveEndpointsConfig(config())
            }

    fun save(endpoint: JsonObject) {
        val endpointExists = exists(endpoint)
        if (endpointExists) update(endpoint) else add(endpoint)
    }

    fun exists(endpoint: JsonObject): Boolean {
        val endpointId = endpoint.getString(ENDPOINT_ID_PROP) ?: return false
        val endpoints = config().getJsonArray(ENDPOINTS) ?: JsonArray()
        return endpoints.stream()
                .map { it as JsonObject }
                .anyMatch {
                    endpointId == it.getString(ENDPOINT_ID_PROP)
                }
    }

    private fun update(endpoint: JsonObject) {
        val endpointId = endpoint.getString(ENDPOINT_ID_PROP)
        val endpointToUpdate = EndpointLoader.from(config(), endpointId)
                .asJson(false)

        endpointToUpdate.mergeIn(endpoint, true)
    }

    private fun add(endpoint: JsonObject) {
        if (!config().containsKey(ENDPOINTS)) {
            config().put(ENDPOINTS, JsonArray())
        }
        endpoint.let {
            it.put(ENDPOINT_ID_PROP, generateId())
            it.put(ENDPOINT_LABEL_PROP, it.getString(ENDPOINT_LABEL_PROP) ?: it.getString(ENDPOINT_ID_PROP))
        }
        config().getJsonArray(ENDPOINTS).add(endpoint)
    }

    private fun generateId(): String {
        val endpoints = config().getJsonArray(ENDPOINTS)
        val lastId: Long = endpoints.stream()
                .map { it as JsonObject }
                .mapToLong { it.getString(ENDPOINT_ID_PROP).replace(ENDPOINT_ID_PREFIX, "").toLong() }
                .max()
                .orElse(0L)

        return ENDPOINT_ID_PREFIX + (lastId + 1)
    }

    fun delete(endpoint: JsonObject) {
        val endpointId = endpoint.getString(ENDPOINT_ID_PROP)
        val endpoints = config().getJsonArray(ENDPOINTS) ?: JsonArray()
        endpoints.stream()
                .map { it as JsonObject }
                .map { it.getString(ENDPOINT_ID_PROP) }
                .filter { it == endpointId }
                .findFirst()
                .ifPresent {
                    val endpointPosition = getEndpointPosition(endpoints, it)
                    endpoints.remove(endpointPosition)
                }
    }

    private fun getEndpointPosition(endpoints: JsonArray, endpointId: String): Int {
        var index = 0
        while (index <= endpoints.size()) {
            val endpoint = endpoints.getJsonObject(index)
            if (endpoint.getString(ENDPOINT_ID_PROP) == endpointId) {
                break
            }
            index++
        }
        return index;
    }
}