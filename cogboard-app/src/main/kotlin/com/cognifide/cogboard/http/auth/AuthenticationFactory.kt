package com.cognifide.cogboard.http.auth

import io.vertx.core.buffer.Buffer
import io.vertx.ext.web.client.HttpRequest

class AuthenticationFactory(
    private val user: String,
    private val password: String,
    private val token: String,
    private val request: HttpRequest<Buffer>
) {

    fun create(authType: AuthenticationType): HttpRequest<Buffer> {
        return when {
            AuthenticationType.TOKEN == authType -> token()
            AuthenticationType.TOKEN_AS_USERNAME == authType -> tokenAsUsername()
            AuthenticationType.BASIC == authType -> basic()
            else -> throw Exception("Authentication type is incorrect")
        }
    }

    private fun basic(): HttpRequest<Buffer> = request.basicAuthentication(user, password)

    private fun token(): HttpRequest<Buffer> = request.basicAuthentication(user, token)

    private fun tokenAsUsername(): HttpRequest<Buffer> = request.basicAuthentication(token, "")
}
