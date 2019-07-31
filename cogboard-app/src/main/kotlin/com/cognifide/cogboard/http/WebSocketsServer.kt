package com.cognifide.cogboard.http

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.AbstractVerticle
import io.vertx.core.Context
import io.vertx.core.Vertx
import io.vertx.core.http.ServerWebSocket
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class WebSocketsServer : AbstractVerticle() {

    private var port = 9000

    override fun init(vertx: Vertx?, context: Context?) {
        super.init(vertx, context)

        port = config().getInteger("port")

        LOGGER.info("Setup: port=$port")
    }

    override fun start() {
        LOGGER.info("Starting <{}>", this::class.java.simpleName)

        val sockets: MutableSet<ServerWebSocket> = hashSetOf()
        val consumer = vertx.eventBus().consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_STATE)

        vertx.createHttpServer().websocketHandler { socket ->
            socket.writeTextMessage(JsonObject().put("status", "CONNECTED").toString())
            sockets.add(socket)
            consumer.handler { message ->
                val iterator = sockets.iterator()
                iterator.forEachRemaining {
                    try {
                        it.writeTextMessage(message.body().toString())
                    } catch (e: IllegalStateException) {
                        LOGGER.info("Removing closed socket.")
                        iterator.remove()
                    }
                }
            }
        }.listen(port)
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(WebSocketsServer::class.java)
    }
}