package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.json.JsonObject

class BoardsConfigService(
    private val contentRepository: ContentRepository = ContentRepository(),
    private val entityCleanupHelper: EntityCleanupHelper? = null,
    private val storage: Storage = boards()
) {

    fun saveBoardsConfig(boardsConfig: JsonObject) {
        val cleanBoardsConfig = executeForWidgets(boardsConfig, this::resetContentNode)
        handleDeletedEntities(cleanBoardsConfig)
        storage.saveConfig(cleanBoardsConfig)
    }

    fun loadBoardsConfig(): JsonObject {
        val config = storage.loadConfig()
        executeForWidgets(config, this::addContent)
        config.getJsonObject(Props.WIDGETS).put(Props.AVAILABLE_WIDGETS, WidgetIndex.availableWidgets())
        return config
    }

    fun getAllWidgets() = getWidgetById(storage.loadConfig())

    fun saveContent(widgetId: String, content: JsonObject) {
        contentRepository.save(widgetId, content)
    }

    fun updateBoard(board: JsonObject) {
        val config = storage.loadConfig()
        val updatedConfig = BoardsConfigHelper.updateBoard(config, board)
        saveBoardsConfig(updatedConfig)
    }

    fun deleteBoard(id: String) {
        val config = storage.loadConfig()
        val updatedConfig = BoardsConfigHelper.removeBoard(config, id)
        saveBoardsConfig(updatedConfig)
    }
    fun getContent(widgetId: String): JsonObject {
        return contentRepository.get(widgetId)
    }

    private fun getWidgetById(boardsConfig: JsonObject) =
            boardsConfig.getJsonObject(Props.WIDGETS)
                    ?.getJsonObject(Props.WIDGETS_BY_ID) ?: JsonObject()

    private fun resetContentNode(widgetId: String, widget: JsonObject) {
        widget.put(Props.CONTENT, JsonObject())
    }

    private fun addContent(widgetId: String, widget: JsonObject) {
        widget.put(Props.CONTENT, contentRepository.get(widgetId))
    }

    private fun executeForWidgets(
        boardsConfig: JsonObject,
        action: (String, JsonObject) -> Unit
    ): JsonObject {
        val widgetsById = getWidgetById(boardsConfig)
        widgetsById.fieldNames()
                .map { it to widgetsById.getJsonObject(it) }
                .forEach { action(it.first, it.second) }

        return boardsConfig
    }

    private fun handleDeletedEntities(boardsConfig: JsonObject) {
        entityCleanupHelper
            ?.handle(storage.loadConfig(), boardsConfig)
            ?.forEach {
                boardsConfig
                    .getJsonObject(Props.WIDGETS)
                    .getJsonObject(Props.WIDGETS_BY_ID)
                    .remove(it)
            }
    }
}
