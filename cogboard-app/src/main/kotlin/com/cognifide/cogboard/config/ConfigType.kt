package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.config.validation.admins.AdminValidator
import java.io.File

enum class ConfigType(private val fileName: String, private val validator: Validator) {

    BOARDS("config.json", BoardsValidator),
    CREDENTIALS("credentials.json", CredentialsValidator),
    ENDPOINTS("endpoints.json", EndpointsValidator),
    ADMIN("admin.json", AdminValidator),
    APP_CONFIG("app-config.json", object : Validator {
        override fun validate(config: String) = true
    });

    fun configFilePath() =
            if (File("/data").exists()) "/data/$fileName"
            else "${System.getProperty("user.dir")}/../mnt/$fileName"

    fun validate(config: String) = validator.validate(config)
}
