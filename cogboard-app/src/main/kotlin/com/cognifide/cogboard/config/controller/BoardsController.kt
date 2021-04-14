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
        sender = ConfirmationSender(vertx) // TODO move to storage
        boardsConfigService = BoardsConfigService(
            contentRepository,
            EntityCleanupHelper(vertx)
        )

        factory.create(CogboardConstants.Event.BOARDS_CONFIG, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
        "save" to { body -> save(body) },
        "update" to { body -> update(body) },
        "delete" to { body -> delete(body) },
        "get" to { _ -> get() }
    )

    private fun save(body: JsonObject): String {
        boardsConfigService.saveBoardsConfig(body)
        sender.sendOk()
        return OK_MESSAGE
    }

    private fun update(body: JsonObject): String {
        boardsConfigService.updateBoard(body)
        sender.sendOk()
        return OK_MESSAGE
    }

    private fun delete(body: JsonObject): String {
        boardsConfigService.deleteBoard(body.getString("id"))
        sender.sendOk()
        return OK_MESSAGE
    }

    private fun get() = boardsConfigService.loadBoardsConfig().toString()

    companion object {
        const val OK_MESSAGE = "{\"message\":\"OK\"}"
    }
}
