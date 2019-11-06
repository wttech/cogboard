package com.cognifide.cogboard.config

import io.vertx.core.json.JsonObject

class EndpointsConfig: Config() {

    override fun validate(configJson: JsonObject): Boolean {
        return configJson.getJsonArray(ENDPOINTS_ARRAY) != null
    }

    override fun filePath() : String = ENDPOINTS_CONFIG_FILE_PATH

    override fun type(): ConfigType = ConfigType.ENDPOINTS

    companion object {
        private const val ENDPOINTS_CONFIG_FILE_PATH = "/data/endpoints.json"
        const val ENDPOINTS_ARRAY = "endpoints"
        const val ENDPOINT_ID_PROP = "id"
        const val ENDPOINT_ID_PREFIX = "endpoint"
        const val ENDPOINT_LABEL_PROP = "label"
        const val ENDPOINT_URL_PROP = "url"
        const val ENDPOINT_PUBLIC_URL_PROP = "publicUrl"
        const val USER = "user"
        const val PASSWORD = "password"
    }
}