package com.cognifide.cogboard.config.validation.endpoints

import com.cognifide.cogboard.config.CredentialsConfig
import com.cognifide.cogboard.config.model.Endpoint
import com.cognifide.cogboard.config.model.Endpoints
import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.utils.JsonUtils.findById
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

object EndpointsValidator : Validator {

    private val LOGGER: Logger = LoggerFactory.getLogger(EndpointsValidator::class.java)

    private val credentialsConfig = CredentialsConfig()

    private val mapper = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

    override fun validate(config: JsonObject): Boolean =
            try {
                val endpoints = mapper.readValue<Endpoints>(config.toString())
                validateEndpoints(endpoints)
            } catch (error: JsonMappingException) {
                LOGGER.error(error.message)
                false
            }

    private fun validateEndpoints(endpoints: Endpoints): Boolean {
        return !endpoints.endpoints.stream()
                .filter { !validateEndpoint(it) }
                .findAny()
                .isPresent
    }

    fun validateEndpoint(endpointJson: JsonObject): Boolean {
        return try {
            val endpoint = mapper.readValue<Endpoint>(endpointJson.toString())
            validateEndpoint(endpoint)
        } catch (error: JsonMappingException) {
            LOGGER.error(error.message)
            false
        }
    }

    private fun validateEndpoint(endpoint: Endpoint): Boolean {
        return endpoint.validateUrl() || endpoint.publicUrl != null
    }

    private fun Endpoint.validateUrl(): Boolean {
        if (this.url == null || this.credentials == null) {
            return false
        }
        val credentials = credentialsConfig.getCredentials()
        return !credentials.findById(this.credentials).isEmpty
    }
}