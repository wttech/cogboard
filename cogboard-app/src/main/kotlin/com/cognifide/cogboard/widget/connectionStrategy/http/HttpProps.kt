package com.cognifide.cogboard.widget.connectionStrategy.http

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.utils.ExtensionFunctions.endpointProp
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject

class HttpProps(
    private val config: JsonObject,
    private val authenticationTypes: Set<Any>,
    private val contentType: String = com.cognifide.cogboard.http.HttpConstants.CONTENT_TYPE_JSON
) {
    private val user: String
        get() = config.endpointProp(Props.USER)
    private val password: String
        get() = config.endpointProp(Props.PASSWORD)

    fun getProps(url: String, eventBusAddress: String) =
            JsonObject()
                    .put(Props.URL, url)
                    .put(Props.EVENT_ADDRESS, eventBusAddress)
                    .put(Props.USER, user)
                    .put(Props.PASSWORD, password)
                    .put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes))
                    .put(Props.CONTENT_TYPE, contentType)
}
