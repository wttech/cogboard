package com.cognifide.cogboard.security

import com.cognifide.cogboard.utils.ExtensionFunctions.toJWT
import io.knotx.server.api.security.AuthHandlerFactory
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.auth.jwt.JWTAuth
import io.vertx.reactivex.ext.web.handler.AuthHandler
import io.vertx.reactivex.ext.web.handler.JWTAuthHandler

class JwtAuthHandlerFactory : AuthHandlerFactory {

    override fun getName(): String = "jwtAuthHandlerFactory"

    override fun create(vertx: Vertx?, config: JsonObject?): AuthHandler {
        val keyStoreOptions = KeyStoreOptions(config)
        return JWTAuthHandler.create(JWTAuth.create(vertx, keyStoreOptions.toJWT()))
    }
}
