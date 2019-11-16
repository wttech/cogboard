package com.cognifide.cogboard.config.validation

interface Validator {

    fun validate(config: String): Boolean
}
