package com.cognifide.cogboard.security

import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.ext.auth.jwt.JWTAuthOptions
import io.vertx.ext.jwt.JWTOptions
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.auth.jwt.JWTAuth
import io.vertx.reactivex.ext.web.RoutingContext

class LoginHandler : RoutingHandlerFactory {

    var vertx: Vertx? = null
    var admins: MutableMap<String, String> = mutableMapOf()

    override fun getName(): String = "login-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> {
        this.vertx = vertx
        loadAdmins(config?.getJsonArray("admins") ?: JsonArray())
        val wrongUserMsg = config?.getString("wrongUserMsg") ?: "Please, enter correct Username"
        val wrongPassMsg = config?.getString("wrongPassMsg") ?: "Please, enter correct Password"

        return Handler { ctx ->
            ctx.bodyAsJson?.let {
                val user = it.getString("username", "")
                val password = it.getString("password", "")
                when {
                    isNotExisting(user) -> sendUnauthorized(ctx, wrongUserMsg)
                    isNotAuthorized(user, password) -> sendUnauthorized(ctx, wrongPassMsg)
                    else -> sendJWT(ctx, user)
                }
            }
        }
    }

    private fun loadAdmins(jsonArray: JsonArray) {
        jsonArray.stream()
                .map { it as JsonObject }
                .forEach {
                    admins[it.getString("name")] = it.getString("pass")
                }
    }

    private fun sendJWT(ctx: RoutingContext, user: String) {
        ctx.response().end(generateJWT(user))
    }

    private fun sendUnauthorized(ctx: RoutingContext, message: String) {
        ctx.response().setStatusMessage(message).setStatusCode(401).end()
    }

    private fun isNotExisting(user: String): Boolean {
        return admins[user] == null
    }

    private fun isNotAuthorized(user: String, password: String): Boolean {
        return password.isBlank() || admins[user] != password
    }

    private fun generateJWT(username: String): String {
        val keyStore = KeyStoreOptions()
                .setType("jceks")
                .setPath("keystore.jceks")
                .setPassword("secret")
        val config = JWTAuthOptions().setKeyStore(keyStore)
        val jwtAuth = JWTAuth.create(vertx, config)

        val token = jwtAuth?.generateToken(
                JsonObject().put("name", username),
                JWTOptions().setExpiresInSeconds(600)
        ) ?: "no data"
        return "{\"token\":\"Bearer $token\"}"
    }

}