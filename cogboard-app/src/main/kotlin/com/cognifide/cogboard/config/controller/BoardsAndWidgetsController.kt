package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.helper.BoardDeletionHelper
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.config.service.WidgetRuntimeService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class BoardsAndWidgetsController : AbstractVerticle() {

    private lateinit var boardsConfigService: BoardsConfigService
    private lateinit var widgetRuntimeService: WidgetRuntimeService
    private lateinit var sender: ConfirmationSender

    override fun start() {
        boardsConfigService = BoardsConfigService()
        boardsConfigService.setDeletionHelper(BoardDeletionHelper(vertx))
        val allWidgets = boardsConfigService.getAllWidgets()
        sender = ConfirmationSender(vertx)
        widgetRuntimeService = WidgetRuntimeService(vertx).init(allWidgets)

        listenOnConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_SAVE_BOARDS_CONFIG)
            .handler {
                sender.confirmationAfter(boardsConfigService::saveBoardsConfig, it.body())
            }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.createOrUpdateWidget(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.deleteWidget(it.body()) }
}
