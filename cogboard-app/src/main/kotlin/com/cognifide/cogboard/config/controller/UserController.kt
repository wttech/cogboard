package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.config.service.UserService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class UserController : AbstractVerticle() {

    private lateinit var userService: UserService
    private val factory = ControllerFactory()

    override fun start() {
        userService = UserService()
        factory.create(Event.USER_CONTROL, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "update" to { body -> update(body) }
    )

    private fun update(body: JsonObject): String {
        val saved = userService.save(body)
        return saved.encode()
    }
}
