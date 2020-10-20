package com.cognifide.cogboard.http.auth

import com.cognifide.cogboard.http.auth.AuthenticationType.Companion.compareType
import io.vertx.core.buffer.Buffer
import io.vertx.ext.web.client.HttpRequest

class AuthenticationFactory(
    private val user: String,
    private val password: String,
    private val token: String,
    private val request: HttpRequest<Buffer>
) : Authentication {

    override fun create(widgetType: String): HttpRequest<Buffer> {
        return if (this.authByToken()) {
            val authType = AuthenticationType.authType(widgetType)
            when {
                AuthenticationType.TOKEN.compareType(authType) -> token()
                AuthenticationType.TOKEN_AS_USERNAME.compareType(authType) -> tokenAsUsername()
                else -> throw Exception("Incorrect authentication type")
            }
        } else basic()
    }

    override fun authByToken(): Boolean = token.isNotBlank()

    private fun basic(): HttpRequest<Buffer> = request.basicAuthentication(user, password)

    private fun token(): HttpRequest<Buffer> = request.basicAuthentication(user, token)

    private fun tokenAsUsername(): HttpRequest<Buffer> = request.basicAuthentication(token, "")
}
