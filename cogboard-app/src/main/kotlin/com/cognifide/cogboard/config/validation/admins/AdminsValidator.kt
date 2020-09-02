package com.cognifide.cogboard.config.validation.admins

import com.cognifide.cogboard.config.model.Admin
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.module.kotlin.readValue

object AdminsValidator : Validator {

    override fun validate(config: String): Boolean =
            try {
                val admin = mapper.readValue<Admin>(config)
                validateAdmin(admin)
            } catch (error: JsonMappingException) {
                logger.error("AdminsValidator: ${error.message}")
                false
            }

    private fun validateAdmin(admin: Admin): Boolean {
        return admin.user.isNotBlank() && admin.password.isNotBlank()
    }
}
