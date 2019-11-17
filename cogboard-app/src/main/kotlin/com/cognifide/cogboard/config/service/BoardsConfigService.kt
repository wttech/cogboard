package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CONTENT
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
    fun saveBoardsConfig(boardsConfig: JsonObject): Boolean {
        val widgetsById = getWidgetById(boardsConfig)
        saveContent(widgetsById)
        return storage.saveConfig(boardsConfig)
    }

    fun loadBoardsConfig(): JsonObject {
        val config = storage.loadConfig()
        loadContent(getWidgetById(config))

        return config
    }

    private fun getWidgetById(boardsConfig: JsonObject) =
            boardsConfig.getJsonObject("widgets")
                    .getJsonObject("widgetsById")

    fun saveContent(widgetId: String, content: JsonObject) {
        contentRepository.save(widgetId, content)
    }
    private fun saveContent(widgetsById: JsonObject) {
        widgetsById.fieldNames()
                .map { it to widgetsById.getJsonObject(it) }
                .forEach {
                    val content = it.second.getJsonObject(PROP_CONTENT)
                    saveContent(it.first, content)
                    it.second.put(PROP_CONTENT, JsonObject())
                }
    }

    private fun loadContent(widgetsById: JsonObject): JsonObject {
        widgetsById.fieldNames()
                .forEach { widgetsById.getJsonObject(it)
                        .put(PROP_CONTENT, contentRepository.get(it)) }

        return widgetsById
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsConfigService::class.java)
    }
}
