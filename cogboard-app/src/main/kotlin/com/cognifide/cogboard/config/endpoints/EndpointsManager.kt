package com.cognifide.cogboard.config.endpoints

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsManager(val config: JsonObject) {

    fun delete(endpoint: JsonObject) {
        val endpointId = endpoint.getString(ID)
        val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
        endpoints.stream()
                .map { it as JsonObject }
                .map { it.getString(ID) }
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
            if (endpoint.getString(ID) == endpointId) {
                break
            }
            index++
        }
        return index;
    }

    fun save(endpoint: JsonObject) {
        val endpointId = endpoint.getString(ID) ?: "0"
        val endpointExists = existsById(endpointId)
        if (endpointExists) update(endpoint) else add(endpoint)
    }

    private fun existsById(endpointId: String): Boolean {
        val endpoints = config.getJsonArray(ENDPOINTS) ?: JsonArray()
        return endpoints.stream()
                .map { it as JsonObject }
                .anyMatch {
                    endpointId == it.getString(ID)
                }
    }

    private fun update(endpoint: JsonObject) {
        val endpointId = endpoint.getString(ID)
        val endpointToUpdate = EndpointLoader.from(config, endpointId)
                .asJson(false)

        endpointToUpdate.mergeIn(endpoint, true)
    }

    private fun add(endpoint: JsonObject) {
        if (!config.containsKey(ENDPOINTS)) {
            config.put(ENDPOINTS, JsonArray())
        }
        endpoint.let {
            it.put(ID, generateId())
            it.put(LABEL, it.getString(LABEL) ?: it.getString(ID))
        }
        config.getJsonArray(ENDPOINTS).add(endpoint)
    }

    private fun generateId(): String {
        val endpoints = config.getJsonArray(ENDPOINTS)
        val lastId: Long = endpoints.stream()
                .map { it as JsonObject }
                .mapToLong { it.getString(ID).replace(ID_PREFIX, "").toLong() }
                .max()
                .asLong

        return ID_PREFIX + (lastId + 1)
    }

    companion object {
        private const val ID = "id"
        private const val LABEL = "label"
        private const val ID_PREFIX = "endpoint"
        private const val ENDPOINTS = "endpoints"
    }
}