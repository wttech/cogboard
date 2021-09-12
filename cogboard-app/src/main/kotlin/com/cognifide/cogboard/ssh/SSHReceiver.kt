package com.cognifide.cogboard.ssh

import com.cognifide.cogboard.CogboardConstants.*
import io.vertx.core.Handler
import io.vertx.core.Vertx
import io.vertx.core.eventbus.Message
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import java.nio.Buffer

interface SSHReceiver {
    val vertx: Vertx
    val user: String
    val password: String
    val sshKey: String
    val host: String
    val logPath: String
    val logLines: Int
    val handler: Handler<Message<Buffer>>
    var consumer: MessageConsumer<Buffer>?

    fun registerForSSH(eventBusAddress: String) {
        consumer = vertx.eventBus().consumer(eventBusAddress, handler)
    }

    fun unregisterFromSSH() {
        consumer?.let {
            it.unregister()
        }
    }

    fun sendRequestForLogs(config: JsonObject) {
        config.getString(Props.USER) ?: config.put(Props.USER, user)
        config.getString(Props.PASSWORD) ?: config.put(Props.PASSWORD, password)
        config.getString(Props.SSH_KEY) ?: config.put(Props.SSH_KEY, sshKey)
        config.getString(Props.SSH_HOST) ?: config.put(Props.SSH_HOST, host)
        config.getString(Props.LOG_FILE_PATH) ?: config.put(Props.LOG_FILE_PATH, logPath)
        config.getString(Props.LOG_LINES) ?: config.put(Props.LOG_LINES, logLines.toString())

        vertx.eventBus().send(Event.SSH_COMMAND, config)
    }
}