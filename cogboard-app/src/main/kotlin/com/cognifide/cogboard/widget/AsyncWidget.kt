package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

/**
 * Async widget class for extending - use this class if your new widget needs to call
 * some 3rd party endpoints to gather data.
 */
abstract class AsyncWidget(
    vertx: Vertx,
    config: JsonObject,
    boardService: BoardsConfigService = BoardsConfigService()
) : BaseWidget(vertx, config, boardService) {

    val user: String = config.endpointProp(CogboardConstants.PROP_USER)
    val password: String = config.endpointProp(CogboardConstants.PROP_PASSWORD)
    val token: String = config.endpointProp(CogboardConstants.PROP_TOKEN)
    val url: String = config.endpointProp(CogboardConstants.PROP_URL)
    val publicUrl: String = config.endpointProp(CogboardConstants.PROP_PUBLIC_URL).ifBlank { url }

    private lateinit var consumer: MessageConsumer<JsonObject>

    override fun start(): Widget {
        consumer = vertx.eventBus()
                .consumer<JsonObject>(eventBusAddress)
                .handler {
                    handleResponse(it.body())
                }
        return super.start()
    }

    override fun stop(): Widget {
        consumer.unregister()
        return super.stop()
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
        vertx.eventBus().send(CogboardConstants.EVENT_HTTP_GET,
                basicProps(url)
                        .put(CogboardConstants.PROP_REQUEST_ID, requestId)
                        .put(CogboardConstants.PROP_TOKEN, token)
        )
    }

    protected fun httpGetStatus(url: String) {
        vertx.eventBus().send(CogboardConstants.EVENT_HTTP_CHECK,
                basicProps(url)
        )
    }

    protected fun httpPut(url: String, body: JsonObject) {
        vertx.eventBus().send(CogboardConstants.EVENT_HTTP_PUT,
                basicProps(url)
                        .put(CogboardConstants.PROP_BODY, body)
        )
    }

    protected fun httpPost(url: String, body: JsonObject) {
        vertx.eventBus().send(CogboardConstants.EVENT_HTTP_POST,
                basicProps(url)
                        .put(CogboardConstants.PROP_BODY, body)
        )
    }

    protected fun httpDelete(url: String) {
        vertx.eventBus().send(CogboardConstants.EVENT_HTTP_DELETE,
                basicProps(url)
        )
    }

    private fun basicProps(url: String): JsonObject {
        return JsonObject()
                .put(CogboardConstants.PROP_URL, url)
                .put(CogboardConstants.PROP_EVENT_ADDRESS, eventBusAddress)
                .put(CogboardConstants.PROP_USER, user)
                .put(CogboardConstants.PROP_PASSWORD, password)
    }
}
