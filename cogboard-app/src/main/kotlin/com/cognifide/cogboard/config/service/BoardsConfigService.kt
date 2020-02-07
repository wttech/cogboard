package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CONTENT
import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorageFactory.get
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class BoardsConfigService(
    private val contentRepository: ContentRepository = ContentRepository(),
    private val entityCleanupHelper: EntityCleanupHelper? = null,
    private val configFile: String = BOARDS.configFile()
) {

    fun saveBoardsConfig(boardsConfig: JsonObject): JsonObject {
        val cleanBoardsConfig = executeForWidgets(boardsConfig, this::resetContentNode)
        handleDeletedEntities(cleanBoardsConfig)
        get(BOARDS, configFile).saveConfig(cleanBoardsConfig)
        return boardsConfig
    }

    fun loadBoardsConfig(): JsonObject {
        val config = get(BOARDS, configFile).loadConfig()
        executeForWidgets(config, this::addContent)

        return config
    }

    fun getAllWidgets() = getWidgetById(get(BOARDS, configFile).loadConfig())

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
            ?.handle(get(BOARDS, configFile).loadConfig(), boardsConfig)
            ?.forEach {
                boardsConfig
                    .getJsonObject(CC.PROP_WIDGETS)
                    .getJsonObject(CC.PROP_WIDGETS_BY_ID)
                    .remove(it)
            }
    }
}
