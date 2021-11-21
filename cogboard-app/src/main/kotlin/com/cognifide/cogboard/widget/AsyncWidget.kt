package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.http.auth.AuthenticationType
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject

/**
 * Async widget class for extending - use this class if your new widget needs to call
 * some 3rd party endpoints to gather data.
 */
abstract class AsyncWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {

    val user: String = config.endpointProp(Props.USER)
    val password: String = config.endpointProp(Props.PASSWORD)
    val token: String = config.endpointProp(Props.TOKEN)
    val url: String = config.endpointProp(Props.URL)
    val publicUrl: String = config.endpointProp(Props.PUBLIC_URL).ifBlank { url }
    private val contentType: String = config.getString(Props.CONTENT_TYPE)
            ?: com.cognifide.cogboard.http.HttpConstants.CONTENT_TYPE_JSON

    private lateinit var consumer: MessageConsumer<JsonObject>

    override fun start(): Widget {
        consumer = vertx.eventBus()
                .consumer<JsonObject>(eventBusAddress)
                .handler {
                    handleResponse(it.body())
                }
        return super.start()
    }

    override fun delete(): Widget {
        return this
    }

    override fun stop(): Widget {
        consumer.unregister()
        return super.stop()
    }

    /**
     * Type of authentication.
     * Should be overridden for widgets which use `httpGet(..)` from HttpClient
     */
    protected open fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.BASIC)
    }

    /**
     * Notifies Widget that it is time to update.
     * Use `httpGet(..)`, `httpPost(..)` or `httpGetStatus(..)` in order to request new state from 3rd party endpoint.
     * When http request is successful then 'handleResponse(responseBody: JsonObject)' will be executed
     */
    abstract override fun updateState()

    /**
     * Executed after successful `httpGet(...)`, `httpPost(...)` or `httpGetStatus(...)`
     */
    abstract fun handleResponse(responseBody: JsonObject)

    protected fun httpGet(url: String, requestId: String = "") {
        vertx.eventBus().send(Event.HTTP_GET,
                basicProps(url)
                        .put(Props.REQUEST_ID, requestId)
                        .put(Props.TOKEN, token)
        )
    }

    protected fun httpGetStatus(url: String) {
        vertx.eventBus().send(Event.HTTP_CHECK,
                basicProps(url)
        )
    }

    protected fun httpPut(url: String, body: JsonObject) {
        vertx.eventBus().send(Event.HTTP_PUT,
                basicProps(url)
                        .put(Props.BODY, body)
        )
    }

    protected fun httpPost(url: String, body: JsonObject) {
        vertx.eventBus().send(Event.HTTP_POST,
                basicProps(url)
                        .put(Props.BODY, body)
        )
    }

    protected fun httpDelete(url: String) {
        vertx.eventBus().send(Event.HTTP_DELETE,
                basicProps(url)
        )
    }

    private fun basicProps(url: String): JsonObject {
        return JsonObject()
                .put(Props.URL, url)
                .put(Props.EVENT_ADDRESS, eventBusAddress)
                .put(Props.USER, user)
                .put(Props.PASSWORD, password)
                .put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
                .put(Props.CONTENT_TYPE, contentType)
    }
}
