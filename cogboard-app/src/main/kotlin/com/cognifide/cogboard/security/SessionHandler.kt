package com.cognifide.cogboard.security

import com.cognifide.cogboard.CogboardConstants.StatusCode
import com.cognifide.cogboard.utils.ExtensionFunctions.asJsonObject
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.VertxException
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class SessionHandler(val storage: Storage = VolumeStorageFactory.admin()) : RoutingHandlerFactory, JwtCommon() {

    private lateinit var sessionRefreshError: String

    override fun getName(): String = "session-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        if (vertx == null || config == null) {
            throw VertxException("Unable to create SessionHandler vertex=$vertx, config=$config")
        }
        init(vertx, config)

        return Handler { ctx ->
            val token = ctx
                .request()
                .getHeader("Authorization")
                ?.substringAfter("Bearer ")
                ?.asJsonObject("jwt")

            jwtAuth.authenticate(token) {
                val username = it.result().delegate.principal().getString("name") ?: ""
                if (it.succeeded() && username.isNotBlank()) {
                    sendJWT(ctx, username)
                } else sendUnauthorized(ctx, sessionRefreshError)
            }
        }
    }

    override fun init(vertx: Vertx, config: JsonObject) {
        super.init(vertx, config)
        sessionRefreshError = config.getString("sessionRefreshError", DEFAULT_ERROR)
    }

    private fun sendUnauthorized(ctx: RoutingContext, message: String) {
        ctx.response().setStatusMessage(message).setStatusCode(StatusCode.a401).end()
    }
}
