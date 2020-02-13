package com.cognifide.cogboard.config.validation.version

import com.cognifide.cogboard.config.model.Version
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.module.kotlin.readValue

object VersionValidator : Validator {

    private val versionRegex: Regex by lazy { Regex("""(\d+.)+\d+(-SNAPSHOT)?""") }

    override fun validate(config: String): Boolean =
        try {
            val infoConfig = mapper.readValue<Version>(config)
            validateInfo(infoConfig)
        } catch (error: JsonMappingException) {
            logger.error("InfoValidator: ${error.message}")
            false
        }

    private fun validateInfo(config: Version): Boolean {
        return versionRegex.matches(config.version)
    }
}
