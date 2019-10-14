package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_MESSAGE
import io.vertx.core.AbstractVerticle
import io.vertx.core.Handler
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
        val client = WebClient.create(vertx)
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_GET).handler { message ->
            client?.let {
                message.body()?.let {
                    makeGet(client, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_CHECK).handler { message ->
            client?.let {
                message.body()?.let {
                    makeCheck(client, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_PUT).handler { message ->
            client?.let {
                message.body()?.let {
                    makePut(client, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_POST).handler { message ->
            client?.let {
                message.body()?.let {
                    makePost(client, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_DELETE).handler { message ->
            client?.let {
                message.body()?.let {
                    makeDelete(client, it)
                }
            }
        }
    }

    private fun makeGet(client: WebClient, config: JsonObject) {
        val httpRequest = client.getAbs(config.getString(CogboardConstants.PROP_URL))
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)

        executeRequest(request, address)
    }

    private fun makeCheck(client: WebClient, config: JsonObject) {
        val httpRequest = client.getAbs(config.getString(CogboardConstants.PROP_URL))
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)

        executeCheckRequest(request, address)
    }

    private fun makePut(client: WebClient, config: JsonObject) {
        val httpRequest = client.putAbs(config.getString(CogboardConstants.PROP_URL))
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CogboardConstants.PROP_BODY)

        body?.let {
            executeRequest(request, address, body)
        }
    }

    private fun makePost(client: WebClient, config: JsonObject) {
        val httpRequest = client.postAbs(config.getString(CogboardConstants.PROP_URL))
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CogboardConstants.PROP_BODY)

        body?.let {
            executeRequest(request, address, body)
        }
    }

    private fun makeDelete(client: WebClient, config: JsonObject) {
        val httpRequest = client.deleteAbs(config.getString(CogboardConstants.PROP_URL))
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)

        executeCheckRequest(request, address)
    }

    private fun initRequest(request: HttpRequest<Buffer>, config: JsonObject): HttpRequest<Buffer> {
        val user = config.getString(CogboardConstants.PROP_USER)
        val pass = config.getString(CogboardConstants.PROP_PASSWORD)

        if (user.isNotBlank() && pass.isNotBlank()) {
            request.basicAuthentication(user, pass)
            request.putHeader("Content-Type", "application/json")
        }
        return request
    }

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?) {
        request.send {
            if (it.succeeded()) {
                toJson(it.result()).let { json ->
                    vertx.eventBus().send(address, json)
                }
            } else {
                LOGGER.error(it.cause()?.message)
            }
        }
    }

    private fun toJson(response: HttpResponse<Buffer>): JsonObject? {
        return try {
            response.bodyAsJsonObject()
        } catch (e: DecodeException) {
            try {
                JsonObject().put(CogboardConstants.PROP_ARRAY, response.bodyAsJsonArray())
            } catch (e: DecodeException) {
                JsonObject().put(CogboardConstants.PROP_BODY, response.bodyAsString())
            }
        }
    }

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?, body: JsonObject?) {
        request.sendJsonObject(body, Handler {
            val result = JsonObject()
            if (it.succeeded()) {
                result.put(PROP_STATUS_CODE, it.result().statusCode())
                result.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
            } else {
                result.put(PROP_STATUS_MESSAGE, "unsuccessful")
                LOGGER.error(it.cause()?.message)
            }
            vertx.eventBus().send(address, result)
        })
    }

    private fun executeCheckRequest(request: HttpRequest<Buffer>, address: String?) {
        request.send {
            val result = JsonObject()
            if (it.succeeded()) {
                result.put(PROP_STATUS_CODE, it.result().statusCode())
                result.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
            } else {
                result.put(PROP_STATUS_MESSAGE, "unsuccessful")
            }
            vertx.eventBus().send(address, result)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(HttpClient::class.java)
    }
}