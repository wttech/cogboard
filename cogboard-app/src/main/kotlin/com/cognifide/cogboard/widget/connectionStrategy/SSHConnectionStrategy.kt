package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import java.nio.charset.Charset

open class SSHConnectionStrategy(vertx: Vertx) : ConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        val config = ensureConfigIsPrepared(arguments)
        vertx.eventBus().send(CogboardConstants.Event.SSH_COMMAND, config)
    }

    override fun getConsumer(eventBusAddress: String): MessageConsumer<*> =
        vertx.eventBus().consumer<Buffer>(eventBusAddress)

    override fun handleResponse(response: Any): String =
        (response as Buffer).toString(Charset.defaultCharset())

    private fun ensureConfigIsPrepared(config: JsonObject): JsonObject {
        config.getString(Props.USER) ?: config.put(Props.USER, config.endpointProp(Props.USER))
        config.getString(Props.PASSWORD) ?: config.put(Props.PASSWORD, config.endpointProp(Props.PASSWORD))
        config.getString(Props.TOKEN) ?: config.put(Props.TOKEN, config.endpointProp(Props.TOKEN))
        config.getString(Props.SSH_KEY) ?: config.put(Props.SSH_KEY, config.endpointProp(Props.SSH_KEY))
        config.getString(Props.SSH_HOST) ?: config.put(Props.SSH_HOST, config.endpointProp(Props.SSH_HOST))
        config.getString(Props.LOG_FILE_PATH) ?: config.put(Props.LOG_FILE_PATH, config.endpointProp(Props.LOG_FILE_PATH))
        config.getString(Props.LOG_LINES) ?: config.put(Props.LOG_LINES, config.endpointProp(Props.LOG_LINES))
        config.getString(Props.AUTHENTICATION_TYPES) ?: config.put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
        return config
    }
}
