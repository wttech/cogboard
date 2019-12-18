package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINTS_ARRAY
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PREFIX
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_LABEL_PROP
import com.cognifide.cogboard.config.utils.JsonUtils.findById
import com.cognifide.cogboard.config.utils.JsonUtils.getObjectPositionById
import com.cognifide.cogboard.config.utils.JsonUtils.putIfNotExist
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.endpoints
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsService(
    private var storage: Storage,
    private val config: JsonObject = endpoints().loadConfig()
) {

    fun loadConfig(): JsonObject = endpoints().loadConfig()

    fun getAllEndpoints(): JsonArray = loadConfig().getJsonArray(ENDPOINTS_ARRAY)

    fun getEndpoint(endpointId: String) = getAllEndpoints().findById(endpointId)

    fun save(endpoint: JsonObject): JsonObject {
        if (exists(endpoint)) update(endpoint) else add(endpoint)
        storage.saveConfig(config)
        return endpoint
    }

    fun exists(endpoint: JsonObject): Boolean {
        val endpointId = endpoint.getString(ENDPOINT_ID_PROP) ?: return false
        val endpoints = config.getJsonArray(ENDPOINTS_ARRAY) ?: JsonArray()
        return endpoints.stream()
                .map { it as JsonObject }
                .anyMatch {
                    endpointId == it.getString(ENDPOINT_ID_PROP)
                }
    }

    private fun update(endpoint: JsonObject) {
        if (EndpointsValidator.validateEndpoint(endpoint)) {
            val endpointId = endpoint.getString(ENDPOINT_ID_PROP)
            val endpointToUpdate = EndpointLoader(config).load(endpointId)
            endpointToUpdate.mergeIn(endpoint, true)
        }
    }

    private fun add(endpoint: JsonObject) {
        setIdAndLabel(endpoint)
        if (EndpointsValidator.validateEndpoint(endpoint)) {
            config
                    .putIfNotExist(ENDPOINTS_ARRAY, JsonArray())
                    .getJsonArray(ENDPOINTS_ARRAY)
                    .add(endpoint)
        }
    }

    private fun setIdAndLabel(endpoint: JsonObject) {
        endpoint.let {
            it.put(ENDPOINT_ID_PROP, generateId())
            it.put(ENDPOINT_LABEL_PROP, it.getString(ENDPOINT_LABEL_PROP)
                    ?: it.getString(ENDPOINT_ID_PROP))
        }
    }

    private fun generateId(): String {
        val endpoints = config.getJsonArray(ENDPOINTS_ARRAY)
        val lastId: Long = endpoints.stream()
                .map { it as JsonObject }
                .mapToLong { it.getString(ENDPOINT_ID_PROP).replace(ENDPOINT_ID_PREFIX, "").toLong() }
                .max()
                .orElse(0L)

        return ENDPOINT_ID_PREFIX + (lastId + 1)
    }

    fun delete(endpointId: String) {
        val endpoints = config.getJsonArray(ENDPOINTS_ARRAY) ?: JsonArray()
        endpoints.stream()
                .map { it as JsonObject }
                .map { it.getString(ENDPOINT_ID_PROP) }
                .filter { it == endpointId }
                .findFirst()
                .ifPresent { endpoints.removeEndpointById(it) }

        storage.saveConfig(config)
    }

    private fun JsonArray.removeEndpointById(id: String) {
        val endpointPosition = this.getObjectPositionById(id, ENDPOINT_ID_PROP)
        this.remove(endpointPosition)
    }
}
