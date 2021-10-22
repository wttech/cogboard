package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.ConnectionType
import com.cognifide.cogboard.widget.connectionStrategy.http.*
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.RequestMethod
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import java.lang.Exception

class ConnectionStrategyFactory(private var vertx: Vertx, props: JsonObject) {
    class ConnectionTypeException : Exception("Unknown strategy type")

    private val connectionType = props.getString(Props.LOG_SOURCE_TYPE)
    private val requestType = props.getString(Props.LOG_REQUEST_TYPE, "")

    fun addVertxInstance(vertx: Vertx): ConnectionStrategyFactory {
        this.vertx = vertx

        return this
    }

    fun build(): ConnectionStrategy {

        return when (connectionType) {
            ConnectionType.HTTP -> {
                when (requestType) {
                    RequestMethod.GET -> HttpGetConnectionStrategy(vertx)
                    RequestMethod.PUT -> HttpPutConnectionStrategy(vertx)
                    RequestMethod.POST -> HttpPostConnectionStrategy(vertx)
                    RequestMethod.DELETE -> HttpDeleteConnectionStrategy(vertx)
                    else -> throw ConnectionTypeException()
                }
            }
            ConnectionType.SSH -> SSHConnectionStrategy(vertx)
            else -> throw ConnectionTypeException()
        }
    }
}
