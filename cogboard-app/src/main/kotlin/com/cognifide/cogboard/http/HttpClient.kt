package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_MESSAGE
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.DecodeException
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.web.client.HttpRequest
import io.vertx.ext.web.client.HttpResponse
import io.vertx.ext.web.client.WebClient

class HttpClient : AbstractVerticle() {

    override fun start() {
        WebClient.create(vertx)?.let {
            registerGET(it)
            registerCHECK(it)
            registerPUT(it)
            registerPOST(it)
            registerDELETE(it)
        }
    }

    private fun registerGET(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_GET).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(CogboardConstants.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerCHECK(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_CHECK).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(CogboardConstants.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPUT(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_PUT).handler { message ->
            message.body()?.let {
                val httpRequest = client.putAbs(it.getString(CogboardConstants.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPOST(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_POST).handler { message ->
            message.body()?.let {
                val httpRequest = client.postAbs(it.getString(CogboardConstants.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerDELETE(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_DELETE).handler { message ->
            message.body()?.let {
                val httpRequest = client.deleteAbs(it.getString(CogboardConstants.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun makeRequest(httpRequest: HttpRequest<Buffer>, config: JsonObject) {
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CogboardConstants.PROP_BODY)
        val requestId = config.getString(CogboardConstants.PROP_REQUEST_ID) ?: ""

        body?.let {
            executeCheckRequest(request, address, body)
        } ?: run {
            executeRequest(request, address, requestId)
        }
    }

    private fun initRequest(request: HttpRequest<Buffer>, config: JsonObject): HttpRequest<Buffer> {
        val user = config.getString(CogboardConstants.PROP_USER) ?: ""
        val pass = config.getString(CogboardConstants.PROP_PASSWORD) ?: ""
        val token = config.getString(CogboardConstants.PROP_TOKEN) ?: ""
        val headers = config.getJsonObject(CogboardConstants.PROP_HEADERS)

        if (user.isNotBlank() && pass.isNotBlank()) {
            request.basicAuthentication(user, pass)
        } else if (user.isNotBlank() && token.isNotBlank()) {
            request.basicAuthentication(user, token)
        }

        setRequestHeaders(request, headers)

        return request
    }

    private fun setRequestHeaders(request: HttpRequest<Buffer>, headers: JsonObject?) {
        request.putHeader(HttpConstants.HEADER_CONTENT_TYPE, HttpConstants.CONTENT_TYPE_JSON)
        headers
                ?.map { Pair(it.key, it.value as String) }
                ?.forEach { request.putHeader(it.first, it.second) }
    }

    private fun toJson(response: HttpResponse<Buffer>): JsonObject {
        return try {
            response.bodyAsJsonObject()
        } catch (e: DecodeException) {
            try {
                JsonObject().put(CogboardConstants.PROP_ARRAY, response.bodyAsJsonArray())
            } catch (e: DecodeException) {
                JsonObject().put("body", response.bodyAsString())
            }
        }
    }

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?, requestId: String) {
        request.send {
            if (!it.succeeded()) {
                vertx.eventBus().send(address, JsonObject()
                        .put(CogboardConstants.PROP_ERROR_MESSAGE, "Http Error")
                        .put(CogboardConstants.PROP_ERROR_CAUSE, it.cause()?.message)
                        .put(CogboardConstants.PROP_REQUEST_ID, requestId))
                LOGGER.error(it.cause()?.message)
            } else {
                toJson(it.result()).let { json ->
                    json.put(PROP_STATUS_CODE, it.result().statusCode())
                    json.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
                    json.put(CogboardConstants.PROP_REQUEST_ID, requestId)
                    vertx.eventBus().send(address, json)
                }
            }
        }
    }

    private fun executeCheckRequest(request: HttpRequest<Buffer>, address: String?, body: JsonObject?) {
        request.sendJsonObject(body) {
            val result = JsonObject()
            if (it.succeeded()) {
                result.put(PROP_STATUS_CODE, it.result().statusCode())
                result.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
                result.put(CogboardConstants.PROP_BODY, it.result().bodyAsString())
            } else {
                result.put(PROP_STATUS_MESSAGE, "unsuccessful")
                LOGGER.error(it.cause()?.message)
            }
            vertx.eventBus().send(address, result)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(HttpClient::class.java)
    }
}
