package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.AsyncWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class ZabbixWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val selectedMetric: String = config.getString(METRIC, "")
    private val host: String = config.getString(HOST, "")

    val logger: Logger
        get() = LoggerFactory.getLogger(ZabbixWidget::class.java)

    override fun updateState() {
        if (authorizationToken.containsKey(publicUrl)) {
            fetchItemData()
        } else {
            fetchAuthorizationToken()
        }
    }

    private fun fetchAuthorizationToken() {
        val body = attachCredentialsToBody()
        httpPost(publicUrl, body)
    }

    private fun attachCredentialsToBody(): JsonObject {
        val credentials = JsonObject()
                .put(CogboardConstants.PROP_USER, user)
                .put(CogboardConstants.PROP_PASSWORD, password)
        return prepareRequestBody(USER_LOGIN, credentials)
    }

    override fun handleResponse(responseBody: JsonObject) {
        val body = responseBody.getString("body")
        val value = JsonObject(body)
        if (value.getValue(RESULT).toString().contains("key_")) {
            send(JsonObject().put("lastValue", extractLastValue(value)))
        } else if (authorizationToken.containsKey(publicUrl) && !value.getString(RESULT).contains(selectedMetric)) {
            fetchItemData()
        } else if (JsonObject(body).containsKey(ERROR)) {
            sendAuthorizationError(JsonObject(body))
            logger.error(responseBody.getValue(ERROR))
        } else {
            saveToken(value.getString(RESULT))
            fetchItemData()
        }
    }

    private fun extractLastValue(value: JsonObject) =
            ((value.getValue(RESULT) as JsonArray).list[0] as LinkedHashMap<*, *>)["lastvalue"]

    private fun fetchItemData() {
        val bodyToSend = prepareRequestBody(ITEM_GET, prepareParams(), authorizationToken[publicUrl])
        httpPost(publicUrl, bodyToSend)
    }

    private fun prepareRequestBody(method: String, params: JsonObject, auth: String? = null): JsonObject {
        val authVal = if (auth == null) {
            null
        } else {
            "\"$auth\""
        }
        val jsonObject = JsonObject(
                """
                {
                    "jsonrpc": "2.0",
                    "method": "$method",
                    "params": $params,
                    "id": 1,
                    "auth": $authVal
                }
            """
        )

        return jsonObject
    }

    private fun prepareParams(): JsonObject {
        val jsonObject = JsonObject(
                """
                {
                    "filter": {
                        "host": [
                            "$host"
                        ]
                    },
                    "search": {
                        "key_": "$selectedMetric"
                    },
                    "sortfield": "name"
                }
            """
        )
        return jsonObject
    }

    private fun saveToken(token: String) {
        authorizationToken[publicUrl] = token
    }

    private fun sendAuthorizationError(responseBody: JsonObject) {
        val error = JsonObject(responseBody.getValue(ERROR).toString())
        val errorMessage = error.getString("message")
        val errorCause = error.getString("cause")

        send(JsonObject().put(
                CogboardConstants.PROP_CONTENT,
                JsonObject()
                        .put(CogboardConstants.PROP_ERROR_MESSAGE, errorMessage)
                        .put(CogboardConstants.PROP_ERROR_CAUSE, errorCause)))
    }

    companion object {
        private const val METRIC = "selectedZabbixMetric"
        private const val HOST = "host"
        private const val USER_LOGIN = "user.login"
        private const val ITEM_GET = "item.get"
        private const val ERROR = "error"
        private const val RESULT = "result"
        protected val authorizationToken = hashMapOf<String, String>()
    }
}
