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
        val result = extractResult(responseBody)
        when {
            hasResponseData(result) -> sendUpdate(result)
            isAuthorized(result) -> fetchItemData()
            hasError(responseBody) -> sendAuthorizationError(responseBody)
            else -> {
                saveToken(result.toString())
                fetchItemData()
            }
        }
    }

    private fun extractResult(responseBody: JsonObject): Any {
        val body = responseBody.getString("body")
        val value = JsonObject(body)
        return value.getValue(RESULT, "")
    }

    private fun hasResponseData(result: Any) = result.toString().contains("key_")

    private fun sendUpdate(result: Any?) {
        val responseParams = result as JsonArray
        send(JsonObject()
                .put(LAST_VALUE, responseParams.extractLastValue(LAST_VALUE))
                .put(NAME, responseParams.extractLastValue(NAME)))
    }

    private fun JsonArray.extractLastValue(param: String) =
            (this.list[0] as LinkedHashMap<*, *>)[param]

    private fun isAuthorized(result: Any) =
            authorizationToken.containsKey(publicUrl) && !result.toString().contains(selectedMetric)

    private fun hasError(responseBody: JsonObject) =
            JsonObject(responseBody.getString("body")).containsKey(ERROR)

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

        return JsonObject(
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
    }

    private fun prepareParams(): JsonObject {
        return JsonObject(
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
    }

    private fun saveToken(token: String) {
        authorizationToken[publicUrl] = token
    }

    private fun sendAuthorizationError(responseBody: JsonObject) {
        val body = JsonObject(responseBody.getString("body"))
        val error = JsonObject(body.getValue(ERROR).toString())
        val errorMessage = error.getString("message")
        val errorCause = error.getString("data")

        logger.error("Error message: $errorMessage; Cause: $errorCause")

        send(JsonObject()
                .put(CogboardConstants.PROP_ERROR_MESSAGE, errorMessage)
                .put(CogboardConstants.PROP_ERROR_CAUSE, errorCause))
    }

    companion object {
        private const val METRIC = "selectedZabbixMetric"
        private const val HOST = "host"
        private const val USER_LOGIN = "user.login"
        private const val ITEM_GET = "item.get"
        private const val ERROR = "error"
        private const val RESULT = "result"
        private const val LAST_VALUE = "lastvalue"
        private const val NAME = "name"
        val authorizationToken = hashMapOf<String, String>()
    }
}
