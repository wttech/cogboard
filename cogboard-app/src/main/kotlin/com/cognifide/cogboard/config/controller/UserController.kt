package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Companion.EVENT_USER_CONTROL
import com.cognifide.cogboard.config.service.UserService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class UserController : AbstractVerticle() {

    private lateinit var userService: UserService
    private val factory = ControllerFactory()

    override fun start() {
        userService = UserService()
        factory.create(EVENT_USER_CONTROL, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "update" to { body -> update(body) }
    )

    private fun update(body: JsonObject): String {
        userService.update(body)
        return body.toString()
    }
}
