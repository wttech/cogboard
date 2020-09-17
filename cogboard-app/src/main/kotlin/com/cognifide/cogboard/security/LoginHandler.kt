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
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.ext.auth.jwt.JWTAuthOptions
import io.vertx.ext.jwt.JWTOptions
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.auth.jwt.JWTAuth
import io.vertx.reactivex.ext.web.RoutingContext

class LoginHandler(val storage: Storage = VolumeStorageFactory.admin()) : RoutingHandlerFactory {

    private var vertx: Vertx? = null
    private lateinit var config: JsonObject

    override fun getName(): String = "login-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        this.vertx = vertx
        this.config = config ?: JsonObject()
        val wrongUserMsg = config?.getString("wrongUserMsg") ?: "Please, enter correct Username"
        val wrongPassMsg = config?.getString("wrongPassMsg") ?: "Please, enter correct Password"

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

    private fun sendJWT(ctx: RoutingContext, user: String) {
        ctx.response().end(generateJWT(user))
    }

    private fun generateJWT(username: String): String {
        val keyStore = KeyStoreOptions()
                .setType(config.getString("type", "jceks"))
                .setPath(config.getString("path", "keystore.jceks"))
                .setPassword(config.getString("password", "secret"))

        val config = JWTAuthOptions().setKeyStore(keyStore)
        val jwtAuth = JWTAuth.create(vertx, config)

        val token = jwtAuth?.generateToken(
                JsonObject().put("name", username),
                JWTOptions().setExpiresInSeconds(SESSION_DURATION_IN_SECONDS)
        ) ?: "no data"
        return "{\"token\":\"Bearer $token\"}"
    }

    companion object {
        private const val SESSION_DURATION_IN_SECONDS = 2 * 60 * 60 // hours * min * sec
    }
}
