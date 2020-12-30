package com.cognifide.cogboard.widget.type.zabbix

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.http.auth.AuthenticationType
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import kotlin.math.roundToLong

class ZabbixWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val selectedMetric: String = config.getString(METRIC, "")
    private val host: String = config.getString(HOST, "")
    private val maxValue: Int = config.getInteger(MAX_VALUE, 0)
    private val range: JsonArray = config.getJsonArray(RANGE, JsonArray())

    override fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.NONE)
    }

    override fun updateState() {
        when {
            publicUrl.isBlank() -> sendConfigurationError("Endpoint URL is blank.")
            authorizationToken.containsKey(publicUrl) -> fetchItemData()
            else -> fetchAuthorizationToken()
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
        val body = responseBody.getString(BODY) ?: "{}"
        val value = JsonObject(body)
        return value.getValue(RESULT, "")
    }

    private fun hasResponseData(result: Any) = result.toString().contains("key_")

    private fun sendUpdate(result: Any) {
        val responseParams = result as JsonArray
        val lastValue = responseParams.extractValue(LAST_VALUE)
        val state = JsonObject()
                .put(LAST_VALUE, lastValue)
                .put(IS_EXPANDED_CONTENT, hasExpandedContent(responseParams.extractValue(NAME)))
                .put(NAME, responseParams.extractValue(NAME))
                .put(HISTORY, modifyHistory(responseParams))
                .put(CogboardConstants.PROP_WIDGET_STATUS, getStatusResponse(lastValue))
        send(state)
    }

    private fun hasExpandedContent(name: String): Boolean {
        return name != "System uptime"
    }

    private fun modifyHistory(responseParams: JsonArray): JsonObject {
        val history = fetchHistoryFromContent()
        val lastUpdate = responseParams.extractValue(LAST_CLOCK).toLong()
        val filteredHistory = history.filter { it.key.toLong() > lastUpdate.minus(HOUR_IN_MILLS) }
        val lastValue = responseParams.extractValue(LAST_VALUE)
        return JsonObject(filteredHistory).mergeIn(JsonObject().put(lastUpdate.toString(), lastValue), true)
    }

    private fun fetchHistoryFromContent(): Map<String, Any> {
        val widgetId = config.getString(CogboardConstants.PROP_ID)
        val content = boardService.getContent(widgetId)
        return content.getJsonObject(HISTORY, JsonObject()).map
    }

    private fun getStatusResponse(lastValue: String): Widget.Status {
        val convertedValue = lastValue.toFloat().roundToLong()
        return when {
            metricHasMaxValue() -> status(convertedValue.convertToPercentage(maxValue), range)
            metricHasProgress() -> status(convertedValue, range)
            else -> Widget.Status.NONE
        }
    }

    private fun metricHasMaxValue() = metricHasProgress() &&
            METRICS_WITH_MAX_VALUE.contains(selectedMetric)

    private fun metricHasProgress() = METRICS_WITH_PROGRESS.contains(selectedMetric)

    private fun isAuthorized(result: Any) =
            authorizationToken.containsKey(publicUrl) && !result.toString().contains(selectedMetric)

    private fun hasError(responseBody: JsonObject) =
            JsonObject(responseBody.getString(BODY)).containsKey(ERROR)

    private fun sendAuthorizationError(responseBody: JsonObject) {
        val body = JsonObject(responseBody.getString(BODY))
        val error = JsonObject(body.getValue(ERROR).toString())
        val errorMessage = error.getString("message")
        val errorCause = error.getString("data")

        LOGGER.error("Error message: $errorMessage; Cause: $errorCause")

        send(JsonObject()
                .put(CogboardConstants.PROP_ERROR_MESSAGE, errorMessage)
                .put(CogboardConstants.PROP_ERROR_CAUSE, errorCause))
    }

    private fun saveToken(token: String) {
        authorizationToken[publicUrl] = token
    }

    private fun fetchItemData() {
        val bodyToSend = prepareRequestBody(ITEM_GET, prepareParams(), authorizationToken[publicUrl])
        httpPost(publicUrl, bodyToSend)
    }

    private fun JsonArray.extractValue(param: String): String =
            (this.list[0] as LinkedHashMap<*, *>)[param] as String

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

    companion object {
        private const val METRIC = "selectedZabbixMetric"
        private const val HOST = "host"
        private const val MAX_VALUE = "maxValue"
        private const val RANGE = "range"
        private const val USER_LOGIN = "user.login"
        private const val ITEM_GET = "item.get"
        private const val ERROR = "error"
        private const val RESULT = "result"
        private const val LAST_VALUE = "lastvalue"
        private const val IS_EXPANDED_CONTENT = "isExpandedContent"
        private const val LAST_CLOCK = "lastclock"
        private const val NAME = "name"
        private const val BODY = "body"
        private const val HISTORY = "history"
        private const val HOUR_IN_MILLS = 3600000L
        val authorizationToken = hashMapOf<String, String>()
        val METRICS_WITH_PROGRESS = setOf(
                "system.cpu.util[,idle]",
                "system.swap.size[,used]",
                "vm.memory.size[available]",
                "vfs.fs.size[/,used]",
                "jmx[\\\"java.lang:type=Memory\\\",\\\"HeapMemoryUsage.used\\\"]")
        val METRICS_WITH_MAX_VALUE = setOf(
                "system.swap.size[,used]",
                "vm.memory.size[available]",
                "vfs.fs.size[/,used]",
                "jmx[\\\"java.lang:type=Memory\\\",\\\"HeapMemoryUsage.used\\\"]")
        val LOGGER: Logger = LoggerFactory.getLogger(ZabbixWidget::class.java)
    }
}
