package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CONTENT
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class BoardsConfigService(
    private val storage: Storage = boards(),
    private val contentRepository: ContentRepository = ContentRepository(),
    private val entityCleanupHelper: EntityCleanupHelper? = null
) {

    fun saveBoardsConfig(boardsConfig: JsonObject): JsonObject {
        val cleanBoardsConfig = executeForWidgets(boardsConfig, this::resetContentNode)
        handleDeletedEntities(cleanBoardsConfig)
        storage.saveConfig(cleanBoardsConfig)
        return boardsConfig
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

    private fun getWidgetById(boardsConfig: JsonObject) =
            boardsConfig.getJsonObject(CC.PROP_WIDGETS)
                    ?.getJsonObject(CC.PROP_WIDGETS_BY_ID) ?: JsonObject()

    private fun resetContentNode(widgetId: String, widget: JsonObject) {
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

    private fun handleDeletedEntities(boardsConfig: JsonObject) {
        entityCleanupHelper
            ?.handle(storage.loadConfig(), boardsConfig)
            ?.forEach {
                boardsConfig
                    .getJsonObject(CC.PROP_WIDGETS)
                    .getJsonObject(CC.PROP_WIDGETS_BY_ID)
                    .remove(it)
            }
    }
}
