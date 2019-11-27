package com.cognifide.cogboard.config.validation.credentials

import com.cognifide.cogboard.config.model.Credential
import com.cognifide.cogboard.config.model.Credentials
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject

object CredentialsValidator : Validator {

    override fun validate(config: String): Boolean =
            try {
                mapper.readValue<Credentials>(config)
                true
            } catch (error: JsonMappingException) {
                logger.error("CredentialsValidator: ${error.message}")
                false
            }

    fun validateCredential(credentialJson: JsonObject): Boolean {
        return try {
            mapper.readValue<Credential>(credentialJson.toString())
            true
        } catch (error: JsonMappingException) {
            logger.error("CredentialsValidator: ${error.message}")
            false
        }
    }
}
