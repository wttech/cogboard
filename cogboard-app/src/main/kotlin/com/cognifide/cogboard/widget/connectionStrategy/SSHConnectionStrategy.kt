package com.cognifide.cogboard.widget.connectionStrategy

import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class SSHConnectionStrategy(vertx: Vertx) : ConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        TODO("Not yet implemented")
    }
}
