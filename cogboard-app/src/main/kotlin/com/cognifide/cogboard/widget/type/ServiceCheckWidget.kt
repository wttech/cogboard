package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.RequestMethod
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

    private val expectedStatusCode = config.getInteger(Props.EXPECTED_STATUS_CODE, 0)
    private val requestMethod = config.getString(Props.REQUEST_METHOD, EMPTY_STRING)
    private val requestBody = config.getString(Props.BODY, EMPTY_STRING)
    private val expectedResponseBody = config.getString(Props.EXPECTED_RESPONSE_BODY, EMPTY_STRING)
    private val urlToCheck: String
        get() = if (publicUrl.isNotBlank()) "$publicUrl${config.getString(Props.PATH, EMPTY_STRING)}"
        else config.getString(Props.PATH, EMPTY_STRING)

    override fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.TOKEN, AuthenticationType.BASIC)
    }

    override fun updateState() {
        if (urlToCheck.isNotBlank()) {
            when (requestMethod) {
                RequestMethod.GET -> httpGet(url = urlToCheck)
                RequestMethod.DELETE -> httpDelete(url = urlToCheck)
                else -> handlePostPut()
            }
        } else {
            sendConfigurationError("Public URL or Path is blank")
        }
    }

    private fun handlePostPut() {
        try {
            val body = if (requestBody.isNotBlank()) JsonObject(requestBody) else JsonObject()
            if (requestMethod == RequestMethod.PUT) {
                httpPut(url = urlToCheck, body = body)
            } else if (requestMethod == RequestMethod.POST) {
                httpPost(url = urlToCheck, body = body)
            }
        } catch (e: DecodeException) {
            sendConfigurationError("Invalid request body.")
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.put(Props.URL, urlToCheck)
            .put(Props.EXPECTED_RESPONSE_BODY, expectedResponseBody)
            .put(Props.EXPECTED_STATUS_CODE, expectedStatusCode)
            .put(Props.WIDGET_STATUS, getStatusResponse(responseBody))

        send(responseBody)
    }

    private fun getStatusResponse(responseBody: JsonObject): Widget.Status {
        val statusCode = responseBody.getInteger(Props.STATUS_CODE, 0)
        val isStatusEquals = Widget.Status.compare(expectedStatusCode, statusCode)
        val isBodyEquals = isResponseBodyEquals(responseBody)

        return if (isStatusEquals == Widget.Status.OK && isBodyEquals) {
            isStatusEquals
        } else Widget.Status.ERROR
    }

    private fun isResponseBodyEquals(responseBody: JsonObject): Boolean {
        return if (expectedResponseBody.isNotBlank()) {
            responseBody.getString(Props.BODY)?.contains(expectedResponseBody) == true
        } else expectedResponseBody.isEmpty()
    }
}
