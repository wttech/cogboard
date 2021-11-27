package com.cognifide.cogboard.widget.connectionStrategy

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.http.auth.AuthenticationType
import io.vertx.core.json.JsonObject

abstract class ConnectionStrategy {
    protected fun JsonObject.endpointProp(prop: String): String {
        return this.getJsonObject(CogboardConstants.Props.ENDPOINT_LOADED)?.getString(prop) ?: ""
    }

    protected open fun authenticationTypes(): Set<Any> {
        return setOf(AuthenticationType.BASIC)
    }

    abstract fun getNumberOfLines(): Long?
    abstract fun getLogs(skipFirstLines: Long?): Collection<String>
}
