package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.RequestMethod.Companion.GET
import com.cognifide.cogboard.CogboardConstants.RequestMethod.Companion.PUT
import com.cognifide.cogboard.CogboardConstants.RequestMethod.Companion.POST
import com.cognifide.cogboard.CogboardConstants.RequestMethod.Companion.DELETE
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.Json
import io.vertx.core.json.JsonObject

class HttpConnectionStrategy(vertx: Vertx, eventBusAddress: String) :
        ConnectionStrategy(vertx, eventBusAddress) {
    override fun sendRequest(address: String, arguments: JsonObject) {
        when (arguments.getString(Props.LOG_REQUEST_TYPE, "")) {
            GET -> vertx.eventBus().send(Event.HTTP_GET, getProps(arguments))
            PUT -> vertx.eventBus().send(Event.HTTP_PUT, putProps(arguments))
            POST -> vertx.eventBus().send(Event.HTTP_POST, postProps(arguments))
            DELETE -> vertx.eventBus().send(Event.HTTP_DELETE, basicProps(arguments))
        }
    }

    override fun getConsumer(eventBusAddress: String): MessageConsumer<*> =
        vertx.eventBus().consumer<JsonObject>(eventBusAddress)

    override fun handleResponse(response: Any): String =
        (response as JsonObject).getString(Props.LOG_LINES)

    private fun basicProps(props: JsonObject): JsonObject =
         JsonObject()
             .put(Props.URL, props.endpointProp(Props.URL))
             .put(Props.EVENT_ADDRESS, eventBusAddress)
             .put(Props.USER, props.endpointProp(Props.USER))
             .put(Props.PASSWORD, props.endpointProp(Props.PASSWORD))
             .put(Props.AUTHENTICATION_TYPES, Json.encode(authenticationTypes()))
             .put(Props.CONTENT_TYPE, props.endpointProp(Props.CONTENT_TYPE))

    private fun getProps(props: JsonObject): JsonObject =
        basicProps(props)
            .put(Props.REQUEST_ID, props.getValue(Props.REQUEST_ID, ""))
            .put(Props.TOKEN, props.endpointProp(Props.TOKEN))

    private fun putProps(props: JsonObject): JsonObject =
        basicProps(props)
            .put(Props.BODY, props.getJsonObject(Props.BODY))

    private fun postProps(props: JsonObject): JsonObject =
        basicProps(props)
            .put(Props.BODY, props.getJsonObject(Props.BODY))
}
