package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.ConnectionType.Companion.HTTP
import com.cognifide.cogboard.CogboardConstants.ConnectionType.Companion.SSH
import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class ConnectionStrategyFactory(
    private var vertx: Vertx,
    props: JsonObject
) {

    private val connectionType = props.getString(Props.LOG_SOURCE_TYPE)

    fun addVertxInstance(vertx: Vertx): ConnectionStrategyFactory {
        this.vertx = vertx
        return this
    }

    fun build(): ConnectionStrategy {
        return when (connectionType) {
            HTTP -> HttpConnectionStrategy(vertx)
            SSH -> SSHConnectionStrategy(vertx)
            else -> throw UnknownConnectionTypeException("Unknown strategy type")
        }
    }
}

class UnknownConnectionTypeException(
    message: String?
) : RuntimeException(message)
