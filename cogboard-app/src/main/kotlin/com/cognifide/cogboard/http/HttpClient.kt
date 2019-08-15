package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants
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
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_POST).handler { message ->
            client?.let {
                message.body()?.let {
                    makePost(client, it)
                }
            }
        }
    }

    private fun makeCheck(client: WebClient, config: JsonObject) {
        val request = initRequest(client, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)

        executeCheckRequest(request, address)
    }

    private fun makeGet(client: WebClient, config: JsonObject) {
        val request = initRequest(client, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)

        executeRequest(request, address)
    }

    private fun makePost(client: WebClient, config: JsonObject) {
        val request = initRequest(client, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CogboardConstants.PROP_BODY)

        body?.let {
            executeRequest(request, address)
        }
    }

    private fun initRequest(client: WebClient, config: JsonObject): HttpRequest<Buffer> {
        val request = client.getAbs(config.getString(CogboardConstants.PROP_URL))
        val user = config.getString(CogboardConstants.PROP_USER)
        val pass = config.getString(CogboardConstants.PROP_PASSWORD)

        if (user.isNotBlank() && pass.isNotBlank()) {
            request.basicAuthentication(user, pass)
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
                JsonObject().put("body", response.bodyAsString())
            }
        }
    }


    private fun executeCheckRequest(request: HttpRequest<Buffer>, address: String?) {
        request.send {
            val result = JsonObject()
            if (it.succeeded()) {
                result.put("statusCode", it.result().statusCode())
                result.put("statusMessage", it.result().statusMessage())
            } else {
                result.put("statusCode", 999)
                result.put("statusMessage", "unsuccessful")
            }
            vertx.eventBus().send(address, result)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(HttpClient::class.java)
    }
}