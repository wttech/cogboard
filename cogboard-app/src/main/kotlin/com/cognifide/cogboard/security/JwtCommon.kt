package com.cognifide.cogboard.security

import com.cognifide.cogboard.utils.ExtensionFunctions.asJsonObject
import com.cognifide.cogboard.utils.ExtensionFunctions.endEmptyJson
import com.cognifide.cogboard.utils.ExtensionFunctions.toJWT
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.ext.jwt.JWTOptions
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.auth.jwt.JWTAuth
import io.vertx.reactivex.ext.web.RoutingContext

open class JwtCommon {

    protected lateinit var jwtAuth: JWTAuth

    protected fun sendJWT(ctx: RoutingContext, user: String) {
        val body = ctx.request().getHeader("body") ?: ""
        ctx.response().putHeader("token", generateJWT(user))
        if (body.isNotEmpty()) ctx.response().end(body)
        else ctx.response().endEmptyJson()
    }

    protected open fun init(vertx: Vertx, config: JsonObject) {
        jwtAuth = initJWT(vertx, config)
    }

    private fun generateJWT(username: String): String {
        val token = jwtAuth.generateToken(
            username.asJsonObject("name"),
            JWTOptions().setExpiresInSeconds(SESSION_DURATION_IN_SECONDS)
        ) ?: "no data"
        return "Bearer $token"
    }

    private fun initJWT(vertx: Vertx, config: JsonObject): JWTAuth {
        val options = KeyStoreOptions()
            .setType(config.getString("type", "jceks"))
            .setPath(config.getString("path", "keystore.jceks"))
            .setPassword(config.getString("password", "secret"))

        return JWTAuth.create(vertx, options.toJWT())
    }

    companion object {
        const val SESSION_DURATION_IN_SECONDS = 5 * 60 * 60 // hours * min * sec
        const val DEFAULT_ERROR = "Unable to authenticate"
    }
}
