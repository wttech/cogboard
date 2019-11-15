package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class BoardsAndWidgetsService(private val config: JsonObject, private val vertx: Vertx) {

    private val storage: Storage = VolumeStorage(ConfigType.BOARDS, vertx)

    private val widgets = mutableMapOf<String, Widget>()

    fun saveBoardsConfig(boardsConfig: JsonObject) = storage.saveConfig(boardsConfig)

    fun loadBoardsConfig(): JsonObject = storage.loadConfig()

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

    fun createOrUpdateWidget(widgetConfig: JsonObject) {
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
            val endpoint = EndpointLoader(config).loadWithSensitiveData(endpointId)
            this.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsAndWidgetsService::class.java)
    }
}
