package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINTS_ARRAY
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PREFIX
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_ID_PROP
import com.cognifide.cogboard.config.EndpointsConfig.Companion.ENDPOINT_LABEL_PROP
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsService(private val config: JsonObject, vertx: Vertx) {

    private var storage: Storage = VolumeStorage(ConfigType.ENDPOINTS, vertx)

    fun loadConfig(): JsonObject = storage.loadConfig()

    fun save(endpoint: JsonObject) {
        if (exists(endpoint)) update(endpoint) else add(endpoint)
        storage.saveConfig(config)
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
        val endpointId = endpoint.getString(ENDPOINT_ID_PROP)
        val endpointToUpdate = EndpointLoader.from(config, endpointId).load()
        endpointToUpdate.mergeIn(endpoint, true)
    }

    private fun add(endpoint: JsonObject) {
        endpoint.let {
            it.put(ENDPOINT_ID_PROP, generateId())
            it.put(ENDPOINT_LABEL_PROP, it.getString(ENDPOINT_LABEL_PROP)
                    ?: it.getString(ENDPOINT_ID_PROP))
        }

        config
                .putIfNotExist(ENDPOINTS_ARRAY, JsonArray())
                .getJsonArray(ENDPOINTS_ARRAY)
                .add(endpoint)
    }

    private fun JsonObject.putIfNotExist(key: String, value: Any): JsonObject {
        if (!this.containsKey(key)) {
            config.put(key, value)
        }
        return this
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
                .ifPresent {
                    val endpointPosition = getEndpointPosition(endpoints, it)
                    endpoints.remove(endpointPosition)
                }

        storage.saveConfig(config)
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
        return index
    }
}