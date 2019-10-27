package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.config.service.BoardsService
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.config.validation.BoardsValidation
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import com.cognifide.cogboard.CogboardConstants

class BoardsAndWidgetsController : AbstractVerticle() {

    private lateinit var storage: Storage

    override fun start() {
        storage = VolumeStorage(ConfigType.BOARDS, vertx)
        listenOnConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
        loadBoardsConfig()
    }

    private fun loadBoardsConfig() {
        val boardsService = BoardsService(config(), vertx)
        val config = storage.loadConfig()
        if (config == CogboardConstants.errorResponse("Config not valid")) {
            LOGGER.error("Boards config is invalid")
            throw BoardsValidation.ValidationException("Boards config is invalid")
        }

        return config.getJsonObject(CogboardConstants.PROP_WIDGETS)
                .getJsonObject(CogboardConstants.PROP_WIDGETS_BY_ID)
                .forEach {
                    boardsService.createOrUpdate(JsonObject(it.value.toString()))
                }
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_SAVE_BOARDS_CONFIG)
            .handler { storage.saveConfig(it.body()) }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { BoardsService(config(), vertx).createOrUpdate(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { BoardsService(config(), vertx).delete(it.body()) }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsAndWidgetsController::class.java)
    }
}