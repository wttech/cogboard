package com.cognifide.cogboard.http.auth

import io.vertx.core.buffer.Buffer
import io.vertx.ext.web.client.HttpRequest

interface Authentication {

    fun create(widgetType: String): HttpRequest<Buffer>

    fun authByToken(): Boolean
}
