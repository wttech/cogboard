package com.cognifide.cogboard.config.validation.admins

import com.cognifide.cogboard.config.model.Admins
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.module.kotlin.readValue

object AdminsValidator : Validator {

    override fun validate(config: String): Boolean =
            try {
                val adminsConfig = mapper.readValue<Admins>(config)
                validateAdmins(adminsConfig)
            } catch (error: JsonMappingException) {
                logger.error("AdminsValidator: ${error.message}")
                false
            }

    private fun validateAdmins(config: Admins): Boolean {
        return if (config.admins.isEmpty()) {
            false
        } else {
            !config.admins.stream().anyMatch { admin ->
                admin.name.isBlank() || admin.pass.isBlank()
            }
        }
    }
}
