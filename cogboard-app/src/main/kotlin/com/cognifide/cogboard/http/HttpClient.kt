package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.http.HttpConstants.CONTENT_TYPE_JSON
import com.cognifide.cogboard.http.HttpConstants.HEADER_CONTENT_TYPE
import com.cognifide.cogboard.http.auth.AuthenticationFactory
import com.cognifide.cogboard.http.auth.AuthenticationType
import io.vertx.core.AbstractVerticle
import io.vertx.core.buffer.Buffer
import io.vertx.core.json.DecodeException
import io.vertx.core.json.Json
import io.vertx.core.json.JsonArray
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
        vertx.eventBus().consumer<JsonObject>(Event.HTTP_GET).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(Props.URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerCHECK(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(Event.HTTP_CHECK).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(Props.URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPUT(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(Event.HTTP_PUT).handler { message ->
            message.body()?.let {
                val httpRequest = client.putAbs(it.getString(Props.URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPOST(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(Event.HTTP_POST).handler { message ->
            message.body()?.let {
                val httpRequest = client.postAbs(it.getString(Props.URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerDELETE(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(Event.HTTP_DELETE).handler { message ->
            message.body()?.let {
                val httpRequest = client.deleteAbs(it.getString(Props.URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun makeRequest(httpRequest: HttpRequest<Buffer>, config: JsonObject) {
        val request = initRequest(httpRequest, config)
        val address = config.getString(Props.EVENT_ADDRESS)
        val body = config.getJsonObject(Props.BODY)
        val requestId = config.getString(Props.REQUEST_ID) ?: ""

        body?.let {
            executeCheckRequest(request, address, body)
        } ?: run {
            executeRequest(request, address, requestId)
        }
    }

    private fun initRequest(request: HttpRequest<Buffer>, config: JsonObject): HttpRequest<Buffer> {
        val user = config.getString(Props.USER) ?: ""
        val pass = config.getString(Props.PASSWORD) ?: ""
        val token = config.getString(Props.TOKEN) ?: ""
        val contentType = config.getString(Props.CONTENT_TYPE) ?: CONTENT_TYPE_JSON
        val headers = config.getJsonObject(Props.HEADERS) ?: JsonObject()
        val authTypesString = config.getString(Props.AUTHENTICATION_TYPES)

        val authTypes = if (authTypesString != null) Json.decodeValue(authTypesString)
        else JsonArray()

        val authenticationType = getAuthenticationType(authTypes as JsonArray, user, token, pass)

        request.authenticate(authenticationType, user, token, pass)

        headers.put(HEADER_CONTENT_TYPE, contentType)
        applyRequestHeaders(request, headers)

        return request
    }

    private fun getAuthenticationType(
        authenticationTypes: JsonArray,
        user: String,
        token: String,
        pass: String
    ): AuthenticationType {

        return authenticationTypes.stream()
                .map { AuthenticationType.valueOf(it.toString()) }
                .filter { hasAuthTypeCorrectCredentials(it, user, token, pass) }
                .findFirst()
                .orElse(AuthenticationType.NONE)
    }

    private fun hasAuthTypeCorrectCredentials(
        authType: AuthenticationType,
        username: String,
        token: String,
        pass: String
    ): Boolean {
        return when {
            authType == AuthenticationType.TOKEN && username.isNotBlank() && token.isNotBlank() -> true
            authType == AuthenticationType.TOKEN_AS_USERNAME && token.isNotBlank() -> true
            else -> authType == AuthenticationType.BASIC && username.isNotBlank() && pass.isNotBlank()
        }
    }

    private fun HttpRequest<Buffer>.authenticate(
        authType: AuthenticationType,
        username: String,
        token: String,
        pass: String
    ) {
        AuthenticationFactory(username, token, pass, this)
                .create(authType)
    }

    private fun applyRequestHeaders(request: HttpRequest<Buffer>, headers: JsonObject) {
        headers
                .map { Pair(it.key, it.value as String) }
                .forEach { request.putHeader(it.first, it.second) }
    }

    private fun executeCheckRequest(request: HttpRequest<Buffer>, address: String?, body: JsonObject?) {
        request.sendJsonObject(body) {
            val result = JsonObject()
            if (it.succeeded()) {
                result.put(Props.STATUS_CODE, it.result().statusCode())
                result.put(Props.STATUS_MESSAGE, it.result().statusMessage())
                result.put(Props.BODY, it.result().bodyAsString())
            } else {
                result.put(Props.STATUS_MESSAGE, "unsuccessful")
                LOGGER.error(it.cause()?.message)
            }
            vertx.eventBus().send(address, result)
        }
    }

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?, requestId: String) {
        request.send {
            if (!it.succeeded()) {
                vertx.eventBus().send(address, JsonObject()
                        .put(Props.ERROR_MESSAGE, "Http Error")
                        .put(Props.ERROR_CAUSE, it.cause()?.message)
                        .put(Props.REQUEST_ID, requestId))
                LOGGER.error(it.cause()?.message)
            } else {
                toJson(it.result()).let { json ->
                    json.put(Props.STATUS_CODE, it.result().statusCode())
                    json.put(Props.STATUS_MESSAGE, it.result().statusMessage())
                    json.put(Props.REQUEST_ID, requestId)
                    vertx.eventBus().send(address, json)
                }
            }
        }
    }

    private fun toJson(response: HttpResponse<Buffer>): JsonObject {
        return try {
            response.bodyAsJsonObject()
        } catch (e: DecodeException) {
            try {
                JsonObject().put(Props.ARRAY, response.bodyAsJsonArray())
            } catch (e: DecodeException) {
                JsonObject().put(Props.BODY, response.bodyAsString())
            }
        } catch (e: IllegalStateException) {
            JsonObject()
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(HttpClient::class.java)
    }
}
