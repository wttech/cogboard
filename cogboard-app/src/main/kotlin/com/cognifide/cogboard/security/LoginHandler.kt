package com.cognifide.cogboard.security

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_PASSWORD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_USER
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_USERNAME
import com.cognifide.cogboard.CogboardConstants.Companion.STATUS_CODE_401
import com.cognifide.cogboard.config.model.Admin
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.VertxException
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class LoginHandler(val storage: Storage = VolumeStorageFactory.admin()) : RoutingHandlerFactory, JwtCommon() {

    private lateinit var wrongUserMsg: String
    private lateinit var wrongPassMsg: String

    override fun getName(): String = "login-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        if (vertx == null || config == null) {
            throw VertxException("Unable to create LoginHandler vertex=$vertx, config=$config")
        }
        init(vertx, config)

        return Handler { ctx ->
            ctx.bodyAsJson?.let {
                val username = it.getString(PROP_USERNAME, "")
                val password = it.getString(PROP_PASSWORD, "")
                val admin = getAdmin(username)
                when {
                    admin == null -> sendUnauthorized(ctx, wrongUserMsg)
                    !isAuthorized(admin, password) -> sendUnauthorized(ctx, wrongPassMsg)
                    else -> sendJWT(ctx, username)
                }
            }
        }
    }

    override fun init(vertx: Vertx, config: JsonObject) {
        super.init(vertx, config)
        wrongUserMsg = config.getString("wrongUserMsg", DEFAULT_ERROR)
        wrongPassMsg = config.getString("wrongPassMsg", DEFAULT_ERROR)
    }

    private fun getAdmin(name: String): Admin? {
        val admin = storage.loadConfig()
        val username = admin.getString(PROP_USER)
        return if (username == name) {
            val password = admin.getString(PROP_PASSWORD)
            Admin(username, password)
        } else null
    }

    private fun isAuthorized(admin: Admin, password: String?) =
        admin.password.isNotBlank() && admin.password == password

    private fun sendUnauthorized(ctx: RoutingContext, message: String) {
        ctx.response().setStatusMessage(message).setStatusCode(STATUS_CODE_401).end()
    }
}
