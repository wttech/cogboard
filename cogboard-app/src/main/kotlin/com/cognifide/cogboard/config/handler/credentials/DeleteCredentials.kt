package com.cognifide.cogboard.config.handler.credentials

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class DeleteCredentials : RoutingHandlerFactory {

    override fun getName(): String = "credentials-delete-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        return Handler { event ->
            val credentialId: String = event.request()
                    .params()
                    .get(PARAM_CREDENTIAL_ID)
            vertx
                    ?.eventBus()
                    ?.publish(CogboardConstants.EVENT_DELETE_CREDENTIALS, JsonObject()
                            .put(CREDENTIAL_ID_PROP, credentialId))
            event
                    .response()
                    .end(config?.getJsonObject("body", CogboardConstants.errorResponse())
                            ?.encode())
        }
    }

    companion object {
        internal const val PARAM_CREDENTIAL_ID: String = "id"
    }
}
