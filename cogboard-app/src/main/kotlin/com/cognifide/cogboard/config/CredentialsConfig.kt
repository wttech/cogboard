package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class CredentialsConfig: Config() {

    fun getCredentials(): JsonArray = load().getJsonArray(CREDENTIALS_ARRAY)

    override fun validate(configJson: JsonObject): Boolean {
        return configJson.getJsonArray(CREDENTIALS_ARRAY) != null
    }

    override fun filePath() : String = CREDENTIALS_CONFIG_FILE_PATH

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