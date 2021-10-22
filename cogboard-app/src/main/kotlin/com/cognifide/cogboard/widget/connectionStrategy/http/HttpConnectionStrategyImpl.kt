package com.cognifide.cogboard.widget.connectionStrategy.http

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class HttpGetConnectionStrategy(vertx: Vertx) : HttpConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        vertx.eventBus().send(Event.HTTP_GET,
                basicProps(arguments)
        )
    }

    override fun basicProps(props: JsonObject): JsonObject {
        return super.basicProps(props)
                .put(Props.REQUEST_ID, props.getValue(Props.REQUEST_ID, ""))
                .put(Props.TOKEN, props.endpointProp(Props.TOKEN))
    }
}

class HttpGetStatusConnectionStrategy(vertx: Vertx) : HttpConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        vertx.eventBus().send(Event.HTTP_CHECK,
                basicProps(arguments)
        )
    }
}

class HttpPutConnectionStrategy(vertx: Vertx) : HttpConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        vertx.eventBus().send(Event.HTTP_PUT,
                basicProps(arguments)
        )
    }

    override fun basicProps(props: JsonObject): JsonObject {
        return super.basicProps(props)
                .put(Props.BODY, props.getJsonObject(Props.BODY))
    }
}

class HttpPostConnectionStrategy(vertx: Vertx) : HttpConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        vertx.eventBus().send(Event.HTTP_POST,
                basicProps(arguments)
        )
    }

    override fun basicProps(props: JsonObject): JsonObject {
        return super.basicProps(props)
                .put(Props.BODY, props.getJsonObject(Props.BODY))
    }
}

class HttpDeleteConnectionStrategy(vertx: Vertx) : HttpConnectionStrategy(vertx) {
    override fun connectAndGetResources(address: String, arguments: JsonObject) {
        vertx.eventBus().send(Event.HTTP_DELETE,
                basicProps(arguments)
        )
    }
}
