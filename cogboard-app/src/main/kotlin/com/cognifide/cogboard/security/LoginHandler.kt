package com.cognifide.cogboard.security

import com.cognifide.cogboard.CogboardConstants
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

class LoginHandler(val storage: Storage = VolumeStorageFactory.admins()) : RoutingHandlerFactory {

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
                val username = it.getString("username", "")
                val password = it.getString("password", "")
                val admin = getAdmin(username)
                when {
                    admin == null -> sendUnauthorized(ctx, wrongUserMsg)
                    admin.isNotAuthorized(password) -> sendUnauthorized(ctx, wrongPassMsg)
                    else -> sendJWT(ctx, username)
                }
            }
        }
    }

    private fun getAdmin(name: String): Admin? {
        val data = storage
                .loadConfig()
                .getJsonArray("admins")
                ?.map { it as JsonObject }
                ?.firstOrNull { it.getString("name") == name }
        return if (data != null) Admin(data.getString("name"), data.getString("pass"))
        else null
    }

    private fun sendJWT(ctx: RoutingContext, user: String) {
        ctx.response().end(generateJWT(user))
    }

    private fun sendUnauthorized(ctx: RoutingContext, message: String) {
        ctx.response().setStatusMessage(message).setStatusCode(CogboardConstants.STATUS_CODE_401).end()
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

    private class Admin(val name: String, val password: String) {
        fun isNotAuthorized(password: String): Boolean {
            return password.isBlank() || this.password != password
        }
    }

    companion object {
        private const val SESSION_DURATION_IN_SECONDS = 2 * 60 * 60 // hours * min * sec
    }
}
