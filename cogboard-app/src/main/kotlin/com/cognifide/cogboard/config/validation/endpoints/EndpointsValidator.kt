package com.cognifide.cogboard.config.validation.endpoints

import com.cognifide.cogboard.config.model.Endpoint
import com.cognifide.cogboard.config.model.Endpoints
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject

object EndpointsValidator : Validator {

    override fun validate(config: String): Boolean =
            try {
                val endpoints = mapper.readValue<Endpoints>(config)
                validateEndpoints(endpoints)
            } catch (error: JsonMappingException) {
                logger.error("EndpointsValidator: ${error.message}")
                false
            }

    private fun validateEndpoints(endpoints: Endpoints): Boolean {
        return !endpoints.endpoints.stream()
                .filter { !isValid(it) }
                .findAny()
                .isPresent
    }

    fun validateEndpoint(endpointJson: JsonObject): Boolean {
        return try {
            val endpoint = mapper.readValue<Endpoint>(endpointJson.toString())
            isValid(endpoint)
        } catch (error: JsonMappingException) {
            logger.error("EndpointsValidator: ${error.message}")
            false
        }
    }

    private fun isValid(endpoint: Endpoint): Boolean {
        return endpoint.id.isNotBlank() && endpoint.label.isNotBlank() && endpoint.url.isNotBlank()
    }
}
