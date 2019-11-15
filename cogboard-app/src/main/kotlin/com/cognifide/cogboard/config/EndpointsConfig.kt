package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class EndpointsConfig : Config() {

    fun getEndpoints(): JsonArray = load().getJsonArray(ENDPOINTS_ARRAY)

    override fun validate(configJson: JsonObject): Boolean {
        return EndpointsValidator.validate(configJson)
    }

    override fun filePath(): String = ENDPOINTS_CONFIG_FILE_PATH

    override fun type(): ConfigType = ConfigType.ENDPOINTS

    companion object {
        private const val ENDPOINTS_CONFIG_FILE_PATH = "/data/endpoints.json"
        const val ENDPOINTS_ARRAY = "endpoints"
        const val ENDPOINT_ID_PROP = "id"
        const val ENDPOINT_ID_PREFIX = "endpoint"
        const val ENDPOINT_LABEL_PROP = "label"
        const val ENDPOINT_URL_PROP = "url"
        const val ENDPOINT_PUBLIC_URL_PROP = "publicUrl"
        const val CREDENTIALS_PROP: String = "credentials"
        const val USER_PROP = "user"
        const val PASSWORD_PROP = "password"
    }
}
