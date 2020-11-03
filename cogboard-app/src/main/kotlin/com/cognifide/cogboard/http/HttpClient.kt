package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants as CC
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_CODE
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_STATUS_MESSAGE
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
        vertx.eventBus().consumer<JsonObject>(CC.EVENT_HTTP_GET).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(CC.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerCHECK(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CC.EVENT_HTTP_CHECK).handler { message ->
            message.body()?.let {
                val httpRequest = client.getAbs(it.getString(CC.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPUT(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CC.EVENT_HTTP_PUT).handler { message ->
            message.body()?.let {
                val httpRequest = client.putAbs(it.getString(CC.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerPOST(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CC.EVENT_HTTP_POST).handler { message ->
            message.body()?.let {
                val httpRequest = client.postAbs(it.getString(CC.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun registerDELETE(client: WebClient) {
        vertx.eventBus().consumer<JsonObject>(CC.EVENT_HTTP_DELETE).handler { message ->
            message.body()?.let {
                val httpRequest = client.deleteAbs(it.getString(CC.PROP_URL))
                makeRequest(httpRequest, it)
            }
        }
    }

    private fun makeRequest(httpRequest: HttpRequest<Buffer>, config: JsonObject) {
        val request = initRequest(httpRequest, config)
        val address = config.getString(CC.PROP_EVENT_ADDRESS)
        val body = config.getJsonObject(CC.PROP_BODY)
        val requestId = config.getString(CC.PROP_REQUEST_ID) ?: ""

        body?.let {
            executeCheckRequest(request, address, body)
        } ?: run {
            executeRequest(request, address, requestId)
        }
    }

    private fun initRequest(request: HttpRequest<Buffer>, config: JsonObject): HttpRequest<Buffer> {
        val user = config.getString(CC.PROP_USER) ?: ""
        val pass = config.getString(CC.PROP_PASSWORD) ?: ""
        val token = config.getString(CC.PROP_TOKEN) ?: ""
        val contentType = config.getString(CC.PROP_CONTENT_TYPE) ?: CONTENT_TYPE_JSON
        val headers = config.getJsonObject(CC.PROP_HEADERS) ?: JsonObject()
        val authTypesString = config.getString(CC.PROP_AUTHENTICATION_TYPES)

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
                result.put(PROP_STATUS_CODE, it.result().statusCode())
                result.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
                result.put(CC.PROP_BODY, it.result().bodyAsString())
            } else {
                result.put(PROP_STATUS_MESSAGE, "unsuccessful")
                LOGGER.error(it.cause()?.message)
            }
            vertx.eventBus().send(address, result)
        }
    }

    private fun executeRequest(request: HttpRequest<Buffer>, address: String?, requestId: String) {
        request.send {
            if (!it.succeeded()) {
                vertx.eventBus().send(address, JsonObject()
                        .put(CC.PROP_ERROR_MESSAGE, "Http Error")
                        .put(CC.PROP_ERROR_CAUSE, it.cause()?.message)
                        .put(CC.PROP_REQUEST_ID, requestId))
                LOGGER.error(it.cause()?.message)
            } else {
                toJson(it.result()).let { json ->
                    json.put(PROP_STATUS_CODE, it.result().statusCode())
                    json.put(PROP_STATUS_MESSAGE, it.result().statusMessage())
                    json.put(CC.PROP_REQUEST_ID, requestId)
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
                JsonObject().put(CC.PROP_ARRAY, response.bodyAsJsonArray())
            } catch (e: DecodeException) {
                JsonObject().put(CC.PROP_BODY, response.bodyAsString())
            }
        } catch (e: IllegalStateException) {
            JsonObject()
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(HttpClient::class.java)
    }
}
