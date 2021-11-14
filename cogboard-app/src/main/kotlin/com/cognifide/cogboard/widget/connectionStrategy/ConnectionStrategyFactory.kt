package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.ConnectionType.Companion.HTTP
import com.cognifide.cogboard.CogboardConstants.ConnectionType.Companion.SSH
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.net.URI

class ConnectionStrategyFactory(
    config: JsonObject,
    uri: String
) {
    private val connectionType: String
    private lateinit var vertx: Vertx
    private lateinit var eventBusAddress: String

    init {
        connectionType = determineConnectionType(uri, config)
    }

    fun addVertxInstance(vertx: Vertx): ConnectionStrategyFactory {
        this.vertx = vertx
        return this
    }

    fun addEventBusAddress(eventBusAddress: String): ConnectionStrategyFactory {
        this.eventBusAddress = eventBusAddress
        return this
    }

    private fun determineConnectionType(uri: String, config: JsonObject): String {
        val url = URI.create(uri)
        return when (url.scheme) {
            "http", "https" -> HTTP
            "ssh" -> {
                prepareSshConfig(url, config)
                SSH
            }
            else -> {
                throw UnknownConnectionTypeException("Unknown strategy type")
            }
        }
    }

    private fun prepareSshConfig(uri: URI, config: JsonObject) {
        config.put(Props.SSH_HOST, uri.host)
        uri.port.let {
            if (it != -1) config.put(Props.SSH_PORT, uri.port)
        }
    }

    fun checkRequiredParameters() {
        var message = ""
        when {
            !::vertx.isInitialized -> message = "Vertx instance not passed to builder"
            !::eventBusAddress.isInitialized -> message = "Eventbus address not passed to builder"
        }

        if (message.isNotBlank()) {
            throw MissingBuilderParametersException(message)
        }
    }

    fun build(): ConnectionStrategy {
        checkRequiredParameters()
        return when (connectionType) {
            HTTP -> HttpConnectionStrategy(vertx, eventBusAddress)
            SSH -> SSHConnectionStrategy(vertx, eventBusAddress)
            else -> throw UnknownConnectionTypeException("Unknown strategy type")
        }
    }
}

class UnknownConnectionTypeException(
    message: String?
) : RuntimeException(message)

class MissingBuilderParametersException(
    message: String?
) : RuntimeException(message)
