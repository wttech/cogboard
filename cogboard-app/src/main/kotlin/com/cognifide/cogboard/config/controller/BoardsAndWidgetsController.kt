package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsAndWidgetsService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class BoardsAndWidgetsController : AbstractVerticle() {

    private lateinit var boardsService: BoardsAndWidgetsService
    private lateinit var sender: ConfirmationSender

    override fun start() {
        boardsService = BoardsAndWidgetsService()
        sender = ConfirmationSender(vertx)
        listenOnConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_SAVE_BOARDS_CONFIG)
            .handler {
                sender.confirmationAfter(boardsService::saveBoardsConfig, it.body())
            }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { boardsService.createOrUpdateWidget(vertx, it.body(), config()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { boardsService.deleteWidget(it.body()) }
}
