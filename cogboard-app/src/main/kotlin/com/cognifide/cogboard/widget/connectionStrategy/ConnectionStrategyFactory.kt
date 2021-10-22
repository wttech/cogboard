package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.ConnectionType
import io.vertx.core.Vertx
import java.lang.Exception

class ConnectionStrategyFactory {
    class ConnectionTypeException : Exception("Unknown strategy type")
    class MissingVertxException : Exception("Vertx hasn't been added to factory instance")

    private lateinit var vertx: Vertx

    fun addVertxInstance(vertx: Vertx): ConnectionStrategyFactory {
        this.vertx = vertx

        return this
    }

    fun build(type: String): ConnectionStrategy {
        if (!::vertx.isInitialized) {
            throw MissingVertxException()
        }

        return when (type) {
            ConnectionType.HTTP -> HTTPConnectionStrategy(vertx)
            ConnectionType.SSH -> SSHConnectionStrategy(vertx)
            else -> throw ConnectionTypeException()
        }
    }
}
