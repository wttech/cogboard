package com.cognifide.cogboard.widget.connectionStrategy

import io.vertx.core.json.JsonObject
import java.net.URI

class ConnectionStrategyFactory(
    private val config: JsonObject,
    private val address: String
) {

    fun build(): ConnectionStrategy {
        return when (URI.create(address).scheme) {
            "ssh" -> SSHConnectionStrategy(config)
            else -> throw UnknownConnectionTypeException("Connection type not supported")
        }
    }
}

class UnknownConnectionTypeException(message: String?) : RuntimeException(message)
