package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import io.vertx.core.json.JsonArray

class CredentialsConfig : Config() {

    fun getCredentials(): JsonArray = load().getJsonArray(CREDENTIALS_ARRAY)

    override fun validate(configJson: String): Boolean {
        return CredentialsValidator.validate(configJson)
    }

    override fun filePath(): String = CREDENTIALS_CONFIG_FILE_PATH

    override fun type(): ConfigType = ConfigType.CREDENTIALS

    companion object {
        private const val CREDENTIALS_CONFIG_FILE_PATH = "/data/credentials.json"
        const val CREDENTIALS_ARRAY = "credentials"
        const val CREDENTIAL_ID_PROP = "id"
        const val CREDENTIAL_ID_PREFIX = "credential"
        const val CREDENTIAL_LABEL_PROP = "label"
        const val USER_PROP = "user"
        const val PASSWORD_PROP = "password"
    }
}
