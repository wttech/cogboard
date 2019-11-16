package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class BoardsAndWidgetsService(private val endpoints: JsonObject,
                              private val storage: Storage,
                              private val contentRepository: ContentRepository) {

    private val widgets = mutableMapOf<String, Widget>()

    fun saveBoardsConfig(boardsConfig: JsonObject) : Boolean {
        val widgetsById = getWidgetById(boardsConfig)
        saveContent(widgetsById)
        return storage.saveConfig(boardsConfig)
    }

    private fun getWidgetById(boardsConfig: JsonObject) =
            boardsConfig.getJsonObject("widgets")
                    .getJsonObject("widgetsById")

    fun loadBoardsConfig(): JsonObject {
        val config = storage.loadConfig()
        loadContent(getWidgetById(config))

        return config
    }

    private fun saveContent(widgetsById: JsonObject) {
        widgetsById.fieldNames()
                .map { it to widgetsById.getJsonObject(it) }
                .forEach {
                    val content = it.second.getJsonObject("content")
                    contentRepository.save(it.first, content)
                    it.second.put("content", JsonObject())
                }
    }

    private fun loadContent(widgetsById: JsonObject) : JsonObject{
        widgetsById.fieldNames()
                .forEach {widgetsById.getJsonObject(it).put("content",contentRepository.get(it))}

        return widgetsById
    }

    fun deleteWidget(widgetConfig: JsonObject) {
        val id = widgetConfig.getString(CogboardConstants.PROP_ID)
        if (id != null) {
            widgets.remove(id)?.stop()
            LOGGER.info("Widget Deleted: $widgetConfig")
        } else {
            LOGGER.error("Widget Delete | " +
                    "There is widget with no ID in configuration: $widgetConfig")
        }
    }

    fun createOrUpdateWidget(vertx: Vertx, widgetConfig: JsonObject) {
        LOGGER.error("widgetConfig: $widgetConfig")
        LOGGER.error("config: $endpoints")

        var newConfig = widgetConfig
        val id = widgetConfig.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(widgetConfig, true)
            }
            newConfig.attachEndpoint()
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | " +
                    "There is widget with no ID in configuration: $widgetConfig")
        }
    }

    private fun JsonObject.attachEndpoint() {
        val endpointId = this.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = EndpointLoader(endpoints).loadWithSensitiveData(endpointId)
            this.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsAndWidgetsService::class.java)
    }
}
