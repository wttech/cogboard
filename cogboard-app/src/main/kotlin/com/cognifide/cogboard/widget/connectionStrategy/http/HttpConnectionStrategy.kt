package com.cognifide.cogboard.widget.connectionStrategy.http

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.http.HttpConstants.CONTENT_TYPE_TEXT

class HttpConnectionStrategy(
    private val config: JsonObject,
    private val vertx: Vertx,
    eventBusAddress: String
) : ConnectionStrategy() {
    private val httpProps = HttpProps(config, authenticationTypes(), CONTENT_TYPE_TEXT)
    private val eventBusAddress = "$eventBusAddress.http"
    private val token: String
        get() = config.endpointProp(Props.TOKEN)

    override fun getNumberOfLines(): Long? {
        TODO("Not yet implemented")
    }

    override fun getLogs(skipFirstLines: Long?): Collection<String> {
        TODO("Not yet implemented")
    }

    private fun httpGet(url: String, requestId: String = "") {
        vertx.eventBus().send(Event.HTTP_GET,
                httpProps.getProps(url, eventBusAddress)
                        .put(Props.REQUEST_ID, requestId)
                        .put(Props.TOKEN, token)
        )
    }
}
