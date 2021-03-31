package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class BoardsController(private val factory: ControllerFactory = ControllerFactory()) : AbstractVerticle() {

    private lateinit var boardsConfigService: BoardsConfigService
    private lateinit var sender: ConfirmationSender

    override fun start() {
        val contentRepository = ContentRepository()
        sender = ConfirmationSender(vertx)
        boardsConfigService = BoardsConfigService(
                contentRepository,
                EntityCleanupHelper(vertx))

        factory.create(CogboardConstants.Event.BOARDS_CONFIG, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "update" to { body -> update(body) },
            "get" to { _ -> get() }
    )

    private fun update(body: JsonObject): String {
        boardsConfigService.saveBoardsConfig(body)
        sender.sendOk()
        return "OK"
    }

    private fun get() = boardsConfigService.loadBoardsConfig().toString()
}
