package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CONTENT
import com.cognifide.cogboard.config.helper.BoardDeletionHelper
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class BoardsConfigService(
    private val storage: Storage = boards(),
    private val contentRepository: ContentRepository = ContentRepository()
) {
    private var boardDeletionHelper: BoardDeletionHelper? = null

    fun saveBoardsConfig(boardsConfig: JsonObject): Boolean {
        val clearBoardsConfig = executeForWidgets(boardsConfig, this::clearContent)

        handleDeletedBoards(boardsConfig)

        return storage.saveConfig(clearBoardsConfig)
    }

    fun loadBoardsConfig(): JsonObject {
        val config = storage.loadConfig()
        executeForWidgets(config, this::addContent)

        return config
    }

    fun getAllWidgets() = getWidgetById(storage.loadConfig())

    fun saveContent(widgetId: String, content: JsonObject) {
        contentRepository.save(widgetId, content)
    }

    fun setDeletionHelper(helper: BoardDeletionHelper) {
        boardDeletionHelper = helper
    }

    private fun getWidgetById(boardsConfig: JsonObject) =
            boardsConfig.getJsonObject("widgets")
                    ?.getJsonObject("widgetsById") ?: JsonObject()

    private fun clearContent(widgetId: String, widget: JsonObject) {
        contentRepository.delete(widgetId)
        widget.put(PROP_CONTENT, JsonObject())
    }

    private fun addContent(widgetId: String, widget: JsonObject) {
        widget.put(PROP_CONTENT, contentRepository.get(widgetId))
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

    private fun handleDeletedBoards(boardsConfig: JsonObject) {
        boardDeletionHelper
            ?.handle(storage.loadConfig(), boardsConfig)
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsConfigService::class.java)
    }
}
