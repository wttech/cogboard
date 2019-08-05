package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

abstract class AsyncWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    val user: String = config.endpointProp("user")
    val password: String = config.endpointProp("password")

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
     * Use `updateStateByGet(...)` or `updateStateByPost(...)` in order to request new state from 3rd party endpoint.
     * When http request is successful then 'handleResponse(responseBody: JsonObject)' will be executed
     */
    abstract override fun updateState()

    /**
     * Executed after successful `updateStateByGet(...)` or `updateStateByPost(...)`
     */
    abstract fun handleResponse(responseBody: JsonObject)

    protected fun httpGet(url: String) {
        vertx.eventBus().send(CogboardConstants.EVENT_SEND_GET,
                JsonObject()
                        .put(CogboardConstants.PROP_URL, url)
                        .put(CogboardConstants.PROP_EVENT_ADDRESS, eventBusAddress)
                        .put(CogboardConstants.PROP_USER, user)
                        .put(CogboardConstants.PROP_PASSWORD, password)
        )
    }

    protected fun httpPost(url: String, body: JsonObject) {
        vertx.eventBus().send(CogboardConstants.EVENT_SEND_POST,
                JsonObject()
                        .put(CogboardConstants.PROP_URL, url)
                        .put(CogboardConstants.PROP_EVENT_ADDRESS, eventBusAddress)
                        .put(CogboardConstants.PROP_USER, user)
                        .put(CogboardConstants.PROP_PASSWORD, password)
                        .put(CogboardConstants.PROP_BODY, body)
        )
    }
}