package com.cognifide.cogboard.widget.connectionStrategy.http

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.widget.connectionStrategy.ConnectionStrategy
import io.vertx.core.Vertx
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject

abstract class HttpConnectionStrategy(vertx: Vertx) : ConnectionStrategy(vertx) {
    protected open fun basicProps(props: JsonObject): JsonObject {
        return JsonObject()
                .put(Props.URL, props.endpointProp(Props.URL))
                .put(Props.EVENT_ADDRESS, props.endpointProp(Props.EVENT_ADDRESS))
                .put(Props.USER, props.endpointProp(Props.USER))
                .put(Props.PASSWORD, props.endpointProp(Props.PASSWORD))
                .put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
                .put(Props.CONTENT_TYPE, props.endpointProp(Props.CONTENT_TYPE))
    }
}
