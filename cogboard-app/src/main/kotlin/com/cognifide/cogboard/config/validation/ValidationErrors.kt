package com.cognifide.cogboard.config.validation

interface ValidationErrors {

    val errors: List<ValidationError>

    fun hasErrors() = errors.isNotEmpty()
}
