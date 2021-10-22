package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.ConnectionType
import java.lang.Exception

class ConnectionStrategyFactory {
    class ConnectionTypeException : Exception("Unknown strategy type")

    fun build(type: String): ConnectionStrategy {
        return when (type) {
            ConnectionType.HTTP -> HTTPConnectionStrategy()
            ConnectionType.SSH -> SSHConnectionStrategy()
            else -> throw ConnectionTypeException()
        }
    }
}
