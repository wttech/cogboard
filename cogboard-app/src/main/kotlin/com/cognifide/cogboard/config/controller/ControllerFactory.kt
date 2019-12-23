package com.cognifide.cogboard.config.controller

import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

class ControllerFactory {
    fun create(address: String, vertx: Vertx, configuration: Map<String, (JsonObject) -> String>): MessageConsumer<JsonObject> {
        return vertx.eventBus()
                .consumer<JsonObject>(address)
                .handler {
                    val body = it.body()
                    configuration[body.getString("method")]?.let { method ->
                        it.reply(method(body.getJsonObject("payload")))
                    }
                }
    }
}
