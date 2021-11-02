package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject
import io.vertx.core.json.JsonArray

class LogViewerWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {
    private val address = config.getString(Props.LOG_SOURCE)
    private val lines = config.getString(Props.LOG_LINES)
    private val connectionType = config.getString(Props.LOG_SOURCE_TYPE)

    private val user: String = config.endpointProp(Props.USER)
    private val password: String = config.endpointProp(Props.PASSWORD)
    private val token: String = config.endpointProp(Props.TOKEN)
    private val sshKey: String = config.endpointProp(Props.SSH_KEY)
    private val url: String = config.endpointProp(Props.URL)
    private val publicUrl: String = config.endpointProp(Props.PUBLIC_URL).ifBlank { url }

    private var consumer: MessageConsumer<*>? = null
    // private val connectionStrategy: ConnectionStrategy = determineConnectionStrategy()

    // override fun start(): Widget {
    //     consumer = connectionStrategy.getConsumer(eventBusAddress)
    //     consumer!!.handler {
    //         handleResponse(it)
    //     }
    //     return super.start()
    // }

    // override fun stop(): Widget {
    //     consumer?.unregister()
    //     return super.stop()
    // }

    private val logs = createTemplateLogs(20)
    override fun updateState() {
        // if (address.isNotBlank()) {
        //     connectionStrategy.sendRequest(address, config)
        // } else {
        //     sendConfigurationError("Endpoint URL is blank")
        // }

        send(JsonObject().put("logs", logs))
    }

    private fun createTemplateLogs(n: Int): JsonArray {
        val types = arrayOf("info", "error", "debug", "success", "warn")
        val logs = JsonArray()

        for (i in 1..n) {
            logs.add(createTemplateLog(types[i % types.size]))
        }
        return logs
    }

    private fun createTemplateLog(type: String): JsonObject {
        return JsonObject("""
            {
                "type": "$type",
                "date": "2021-04-22 14:08:37",
                "additionalData": {
                    "ID": "123456",
                    "Type": "sys",
                    "IP address": "127.0.0.1",
                    "Port": "27017"
                },
                "variableData": {
                    "template": ["Provider", "Message"],
                    "header": [
                    "mongodb.log",
                    "Expected corresponding JSX closing tag for <GridSchemaa>."
                    ],
                    "description": [
                    "provider desc",
                    "SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6) SyntaxError: /Users/celmer/Documents/js/cogboard/cogboard-webapp/src/components/widgets/types/LogViewerWidget/LogList/index.js: Expected corresponding JSX closing tag for <GridSchemaa>. (21:6)"
                    ]
                }
            }
        """)
    }

    // private fun handleResponse(response: Message<*>) {
    //     val responseBody = response.body()
    //     if (responseBody is JsonObject) {
    //         handleHttpResponse(responseBody)
    //     } else {
    //         send(prepareLogs(connectionStrategy.handleResponse(responseBody)))
    //     }
    // }

    // private fun handleHttpResponse(responseBody: JsonObject) {
    //     if (checkAuthorized(responseBody)) {
    //         send(prepareLogs(connectionStrategy.handleResponse(responseBody)))
    //     }
    // }

    // private fun prepareLogs(logs: String): String {
    //     // TODO
    //     return logs
    // }

    // private fun determineConnectionStrategy() =
    //         ConnectionStrategyFactory(vertx, config)
    //             .addVertxInstance(vertx)
    //             .build()
}
