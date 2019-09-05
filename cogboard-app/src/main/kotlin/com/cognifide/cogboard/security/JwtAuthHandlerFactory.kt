package com.cognifide.cogboard.security

import io.knotx.server.api.security.AuthHandlerFactory
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.ext.auth.jwt.JWTAuthOptions
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.auth.jwt.JWTAuth
import io.vertx.reactivex.ext.web.handler.AuthHandler
import io.vertx.reactivex.ext.web.handler.JWTAuthHandler

class JwtAuthHandlerFactory : AuthHandlerFactory {

    override fun getName(): String = "jwtAuthHandlerFactory"

    override fun create(vertx: Vertx?, config: JsonObject?): AuthHandler {
        val keyStoreOptions = KeyStoreOptions(config)
        val jwtAuthOptions = JWTAuthOptions().setKeyStore(keyStoreOptions)
        return JWTAuthHandler.create(JWTAuth.create(vertx, jwtAuthOptions))
    }
}