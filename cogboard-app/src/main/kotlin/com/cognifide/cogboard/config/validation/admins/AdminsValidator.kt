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
        if (config.admins.isEmpty()) {
            return false
        } else {
            config.admins.forEach() { admin ->
                if (admin.name.isEmpty() || admin.pass.isEmpty()) {
                    return false
                }
                return true
            }
        }
        return true
    }
}
