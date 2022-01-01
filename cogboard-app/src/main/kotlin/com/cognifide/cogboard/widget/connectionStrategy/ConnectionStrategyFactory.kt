package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.widget.connectionStrategy.http.HttpConnectionStrategy
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.net.URI

class ConnectionStrategyFactory(
    private val config: JsonObject,
    private val address: String,
    private val eventBusAddress: String
) {

    fun build(vertx: Vertx): ConnectionStrategy {
        return when (URI.create(address).scheme) {
            "ssh" -> SSHConnectionStrategy(config)
            "http", "https" -> HttpConnectionStrategy(config, vertx, eventBusAddress)
            else -> throw UnknownConnectionTypeException("Connection type not supported")
        }
    }
}

class UnknownConnectionTypeException(message: String?) : RuntimeException(message)
