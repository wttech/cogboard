package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.config.validation.admins.AdminsValidator

enum class ConfigType(private val fileName: String, private val validator: Validator) {

    BOARDS("config.json", BoardsValidator),
    CREDENTIALS("credentials.json", CredentialsValidator),
    ENDPOINTS("endpoints.json", EndpointsValidator),
    ADMINS("admins.json", AdminsValidator);

    fun configFile() = "/data/$fileName"
    fun validate(config: String) = validator.validate(config)
}
