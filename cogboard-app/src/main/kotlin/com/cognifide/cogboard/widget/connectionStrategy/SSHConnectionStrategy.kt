package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.buffer.Buffer
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject
import java.nio.charset.Charset

open class SSHConnectionStrategy(vertx: Vertx, eventBusAddress: String) :
        ConnectionStrategy(vertx, eventBusAddress) {
    override fun sendRequest(address: String, arguments: JsonObject) {
        val config = prepareConfig(arguments)
        vertx.eventBus().send(CogboardConstants.Event.SSH_COMMAND, config)
    }

    override fun getConsumer(eventBusAddress: String): MessageConsumer<*> =
        vertx.eventBus().consumer<Buffer>(eventBusAddress)

    override fun handleResponse(response: Any): String =
        (response as Buffer).toString(Charset.defaultCharset())

    private fun prepareConfig(config: JsonObject): JsonObject {
        val tmpConfig = prepareConfigLines(config = config,
            Props.USER, Props.PASSWORD, Props.TOKEN, Props.SSH_KEY, Props.SSH_KEY_PASSPHRASE
        )

        tmpConfig.getString(Props.AUTHENTICATION_TYPES) ?: config.put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
        tmpConfig.put(Props.EVENT_ADDRESS, eventBusAddress)
        return tmpConfig
    }

    private fun prepareConfigLines(config: JsonObject, vararg fields: String): JsonObject {
        for (field in fields) {
            config.getString(field) ?: config.put(field, config.endpointProp(field))
        }
        return config
    }
}
