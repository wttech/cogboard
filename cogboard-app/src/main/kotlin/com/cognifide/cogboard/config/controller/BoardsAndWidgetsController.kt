package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.EVENT_BOARDS_CONFIG
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.config.service.WidgetRuntimeService
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorageFactory
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class BoardsAndWidgetsController : AbstractVerticle() {

    private lateinit var boardsConfigService: BoardsConfigService
    private lateinit var widgetRuntimeService: WidgetRuntimeService
    private lateinit var sender: ConfirmationSender
    private val factory = ControllerFactory()
    override fun start() {
        val contentRepository = ContentRepository()
        boardsConfigService = BoardsConfigService(
                VolumeStorageFactory.boards(),
                contentRepository,
                EntityCleanupHelper(vertx))

        val allWidgets = boardsConfigService.getAllWidgets()
        sender = ConfirmationSender(vertx)
        widgetRuntimeService =
                WidgetRuntimeService(vertx, contentRepository)
                        .init(allWidgets)

        listenOnBoardConfig()

        listenOnWidgetUpdate()
        listenOnWidgetContentUpdate()
        listenOnWidgetDelete()
        listenOnWidgetPurge()
    }

    private fun listenOnBoardConfig() {
        factory.create(EVENT_BOARDS_CONFIG, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "update" to { body -> update(body) },
            "get" to { body -> boardsConfigService.loadBoardsConfig().toString() }
    )

    private fun update(body: JsonObject): String {
        val saved = boardsConfigService.saveBoardsConfig(body)
        sender.sendOk()
        return saved.toString()
    }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.createOrUpdateWidget(it.body()) }

    private fun listenOnWidgetContentUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONTENT_CONFIG)
            .handler {
                widgetRuntimeService.handleWidgetContentUpdate(it.body())
            }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.destroyWidget("Delete", it.body()) }

    private fun listenOnWidgetPurge() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_PURGE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.destroyWidget("Purge", it.body()) }
}
