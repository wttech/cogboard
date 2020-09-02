package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.config.validation.admins.AdminsValidator
import com.cognifide.cogboard.config.validation.version.VersionValidator

enum class ConfigType(private val fileName: String, private val validator: Validator) {

    BOARDS("config.json", BoardsValidator),
    CREDENTIALS("credentials.json", CredentialsValidator),
    ENDPOINTS("endpoints.json", EndpointsValidator),
    ADMIN("admin.json", AdminsValidator),
    VERSION(".version", VersionValidator);

    fun configFilePath() = "/data/$fileName"
    fun validate(config: String) = validator.validate(config)
}
