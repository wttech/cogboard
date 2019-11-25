package com.cognifide.cogboard.config.validation

import com.cognifide.cogboard.config.validation.admins.AdminsValidator
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

interface Validator {

    val logger: Logger
        get() = LoggerFactory.getLogger(AdminsValidator::class.java)

    fun validate(config: String): Boolean
}
