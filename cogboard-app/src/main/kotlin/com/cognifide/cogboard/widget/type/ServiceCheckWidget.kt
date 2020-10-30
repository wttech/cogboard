package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_BODY
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_EXPECTED_RESPONSE_BODY
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_EXPECTED_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_PATH
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_REQUEST_METHOD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_URL
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_WIDGET_STATUS
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_DELETE
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_GET
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_POST
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_PUT
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.http.auth.AuthenticationType
import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.netty.util.internal.StringUtil.EMPTY_STRING
import io.vertx.core.Vertx
import io.vertx.core.json.DecodeException
import io.vertx.core.json.JsonObject

class ServiceCheckWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {

    private val expectedStatusCode = config.getInteger(PROP_EXPECTED_STATUS_CODE, 0)
    private val requestMethod = config.getString(PROP_REQUEST_METHOD, EMPTY_STRING)
    private val requestBody = config.getString(PROP_BODY, EMPTY_STRING)
    private val expectedResponseBody = config.getString(PROP_EXPECTED_RESPONSE_BODY, EMPTY_STRING)
    private val urlToCheck: String
        get() = if (publicUrl.isNotBlank()) "$publicUrl${config.getString(PROP_PATH, EMPTY_STRING)}"
        else config.getString(PROP_PATH, EMPTY_STRING)

    override fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.TOKEN, AuthenticationType.BASIC)
    }

    override fun updateState() {
        if (urlToCheck.isNotBlank()) {
            when (requestMethod) {
                REQUEST_METHOD_GET -> httpGet(url = urlToCheck)
                REQUEST_METHOD_DELETE -> httpDelete(url = urlToCheck)
                else -> handlePostPut()
            }
        } else {
            sendConfigurationError("Public URL or Path is blank")
        }
    }

    private fun handlePostPut() {
        try {
            val body = if (requestBody.isNotBlank()) JsonObject(requestBody) else JsonObject()
            if (requestMethod == REQUEST_METHOD_PUT) {
                httpPut(url = urlToCheck, body = body)
            } else if (requestMethod == REQUEST_METHOD_POST) {
                httpPost(url = urlToCheck, body = body)
            }
        } catch (e: DecodeException) {
            sendConfigurationError("Invalid request body.")
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.put(PROP_URL, urlToCheck)
            .put(PROP_EXPECTED_RESPONSE_BODY, expectedResponseBody)
            .put(PROP_EXPECTED_STATUS_CODE, expectedStatusCode)
            .put(PROP_WIDGET_STATUS, getStatusResponse(responseBody))

        send(responseBody)
    }

    private fun getStatusResponse(responseBody: JsonObject): Widget.Status {
        val statusCode = responseBody.getInteger(PROP_STATUS_CODE, 0)
        val isStatusEquals = Widget.Status.compare(expectedStatusCode, statusCode)
        val isBodyEquals = isResponseBodyEquals(responseBody)

        return if (isStatusEquals == Widget.Status.OK && isBodyEquals)
            isStatusEquals
        else Widget.Status.ERROR
    }

    private fun isResponseBodyEquals(responseBody: JsonObject): Boolean {
        return if (expectedResponseBody.isNotBlank()) {
            responseBody.getString(PROP_BODY)?.contains(expectedResponseBody) == true
        } else expectedResponseBody.isEmpty()
    }
}
