package com.cognifide.cogboard.config.validation.credentials

import com.cognifide.cogboard.config.model.Credential
import com.cognifide.cogboard.config.model.Credentials
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory


object CredentialsValidator : Validator {

    private val LOGGER: Logger = LoggerFactory.getLogger(CredentialsValidator::class.java)

    private val mapper = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

    override fun validate(config: JsonObject): Boolean =
            try {
                mapper.readValue<Credentials>(config.toString())
                true
            } catch (error: JsonMappingException) {
                LOGGER.error(error.message)
                false
            }

    fun validateCredential(credentialJson: JsonObject): Boolean {
        return try {
            mapper.readValue<Credential>(credentialJson.toString())
            true
        } catch (error: JsonMappingException) {
            LOGGER.error(error.message)
            false
        }
    }
}