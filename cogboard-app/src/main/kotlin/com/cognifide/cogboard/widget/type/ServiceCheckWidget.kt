package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_BODY
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CONTENT
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_EXPECTED_RESPONSE_BODY
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_EXPECTED_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_ID
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_PATH
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_REQUEST_METHOD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_URL
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_DELETE
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_GET
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_POST
import com.cognifide.cogboard.CogboardConstants.Companion.REQUEST_METHOD_PUT
import com.cognifide.cogboard.widget.AsyncWidget
import io.netty.util.internal.StringUtil.EMPTY_STRING
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ServiceCheckWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val expectedStatusCode = config.getInteger(PROP_EXPECTED_STATUS_CODE, 0)
    private val requestMethod = config.getString(PROP_REQUEST_METHOD, EMPTY_STRING)
    private val path = config.getString(PROP_PATH, EMPTY_STRING)
    private val requestBody = config.getString(PROP_BODY, EMPTY_STRING)
    private val expectedResponseBody = config.getString(PROP_EXPECTED_RESPONSE_BODY, EMPTY_STRING)

    override fun updateState() {
        if (publicUrl.isNotBlank()) {
            when (requestMethod) {
                REQUEST_METHOD_GET -> httpGet(url = "$publicUrl$path")
                REQUEST_METHOD_PUT -> httpPut(url = "$publicUrl$path", body = JsonObject(requestBody))
                REQUEST_METHOD_POST -> httpPost(url = "$publicUrl$path", body = JsonObject(requestBody))
                REQUEST_METHOD_DELETE -> httpDelete(url = "$publicUrl$path")
            }
        } else {
            sendConfigurationError("URL is blank")
        }
    }

    override fun handleResponse(responseBody: JsonObject) {
        responseBody.put(PROP_URL, publicUrl)
        responseBody.put(PROP_EXPECTED_STATUS_CODE, expectedStatusCode)
        responseBody.put(PROP_EXPECTED_RESPONSE_BODY, expectedResponseBody)

        send(JsonObject()
                .put(PROP_ID, id)
                .put(PROP_CONTENT, responseBody))
    }
}