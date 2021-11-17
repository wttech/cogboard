package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.http.auth.AuthenticationType
import io.vertx.core.Vertx
import io.vertx.core.eventbus.MessageConsumer
import io.vertx.core.json.JsonObject

abstract class ConnectionStrategy(protected val vertx: Vertx, protected val eventBusAddress: String) {
    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.Props.ENDPOINT_LOADED)?.getString(prop) ?: ""
    }

    protected open fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.BASIC)
    }

    abstract fun sendRequest(address: String, arguments: JsonObject)

    abstract fun getConsumer(eventBusAddress: String): MessageConsumer<*>

    abstract fun handleResponse(response: Any): String
}

abstract class ConnectionStrategyInt {
    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.Props.ENDPOINT_LOADED)?.getString(prop) ?: ""
    }

    protected open fun authenticationTypes(): Set<AuthenticationType> {
        return setOf(AuthenticationType.BASIC)
    }

    abstract suspend fun getNumberOfLines(): Int?
    abstract suspend fun getLogs(skipFirstLines: Int?): Collection<String>
}
