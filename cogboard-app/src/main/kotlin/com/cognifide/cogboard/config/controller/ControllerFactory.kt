package com.cognifide.cogboard.config.controller

import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

class ControllerFactory {
    fun create(
        address: String,
        vertx: Vertx,
        configuration: Map<String, (JsonObject) -> String>
    ): MessageConsumer<JsonObject> = vertx.eventBus()
            .consumer<JsonObject>(address)
            .handler {
                val body = it.body()
                configuration[body.getString("method")]?.let { method ->
                    it.reply(method(body.getJsonObject("payload")))
                    handleRefreshWidgets(body, vertx)
                }
            }

    private fun handleRefreshWidgets(body: JsonObject, vertx: Vertx) {
        if (body.getBoolean("refresh") == true) {
            val payload = body.getValue("payload")
            val address = body.getString("address")
            val receiverAddress = "$address.update"
            vertx.eventBus().send(receiverAddress, payload)
        }
    }
}
