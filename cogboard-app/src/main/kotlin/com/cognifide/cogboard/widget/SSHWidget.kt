package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.config.service.BoardsConfigService
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import java.nio.Buffer

abstract class SSHWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : AsyncWidget(vertx, config, serv) {
    val sshKey: String = config.endpointProp(Props.SSH_KEY)
    val host: String = config.endpointProp(Props.SSH_HOST)
    val logPath: String = config.endpointProp(Props.LOG_FILE_PATH)
    val logLines: String = config.endpointProp(Props.LOG_LINES)
    private lateinit var sshConsumer: MessageConsumer<Buffer>

    fun registerForSSH(eventBusAddress: String) {
        sshConsumer = vertx.eventBus()
                .consumer<Buffer>(eventBusAddress)
                .handler {
                    handleSSHResponse(it.body())
                }
    }

    abstract fun handleSSHResponse(body: Buffer?)

    fun unregisterFromSSH() {
        if (::sshConsumer.isInitialized) {
            sshConsumer.unregister()
        }
    }

    fun sendRequestForLogs(config: JsonObject) {
        config.getString(Props.USER) ?: config.put(Props.USER, user)
        config.getString(Props.PASSWORD) ?: config.put(Props.PASSWORD, password)
        config.getString(Props.TOKEN) ?: config.put(Props.TOKEN, token)
        config.getString(Props.SSH_KEY) ?: config.put(Props.SSH_KEY, sshKey)
        config.getString(Props.SSH_HOST) ?: config.put(Props.SSH_HOST, host)
        config.getString(Props.LOG_FILE_PATH) ?: config.put(Props.LOG_FILE_PATH, logPath)
        config.getString(Props.LOG_LINES) ?: config.put(Props.LOG_LINES, logLines)

        vertx.eventBus().send(Event.SSH_COMMAND, config)
    }
}
