package com.cognifide.cogboard.widget.connectionStrategy

import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

abstract class ConnectionStrategy(protected val vertx: Vertx) {

    abstract fun connectAndGetResources(address: String, arguments: JsonObject)
}
