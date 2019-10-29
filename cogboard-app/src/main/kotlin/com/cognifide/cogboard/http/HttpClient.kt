package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_MESSAGE
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import io.vertx.ext.web.client.HttpRequest
import io.vertx.ext.web.client.WebClient

class HttpClient : AbstractVerticle() {

    override fun start() {
        val client = WebClient.create(vertx)
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_GET).handler { message ->
            client?.let {
                message.body()?.let {
                    val httpRequest = client.getAbs(it.getString(CogboardConstants.PROP_URL))
                    makeRequest(httpRequest, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_CHECK).handler { message ->
            client?.let {
                message.body()?.let {
                    val httpRequest = client.getAbs(it.getString(CogboardConstants.PROP_URL))
                    makeRequest(httpRequest, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_PUT).handler { message ->
            client?.let {
                message.body()?.let {
                    val httpRequest = client.putAbs(it.getString(CogboardConstants.PROP_URL))
                    makeRequest(httpRequest, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_POST).handler { message ->
            client?.let {
                message.body()?.let {
                    val httpRequest = client.postAbs(it.getString(CogboardConstants.PROP_URL))
                    makeRequest(httpRequest, it)
                }
            }
        }
        vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_HTTP_DELETE).handler { message ->
            client?.let {
                message.body()?.let {
                    val httpRequest = client.deleteAbs(it.getString(CogboardConstants.PROP_URL))
                    makeRequest(httpRequest, it)
                }
            }
        }
    }

    private fun makeRequest(httpRequest: HttpRequest<Buffer>, config: JsonObject) {
        val request = initRequest(httpRequest, config)
        val address = config.getString(CogboardConstants.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CogboardConstants.PROP_BODY)

        body?.let {
            executeRequest(request, address, body)
        } ?: run {
            executeRequest(request, address, JsonObject())
        }
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

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?, body: JsonObject?) {
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