package com.cognifide.cogboard.config.validation

import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

interface Validator {

    val logger: Logger
        get() = LoggerFactory.getLogger(Validator::class.java)

    val mapper: ObjectMapper
        get() = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

    fun validate(config: String): Boolean
}
