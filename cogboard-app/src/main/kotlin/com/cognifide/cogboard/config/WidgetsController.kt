package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.docker.VolumeStorage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class WidgetsController : AbstractVerticle() {

    private val widgets = mutableMapOf<String, Widget>()
    private lateinit var storage: Storage

    override fun start() {
        storage = VolumeStorage(vertx)
        listenOnBoardsConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
        loadBoardsConfig()
    }

    private fun listenOnBoardsConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_SAVE_BOARDS_CONFIG)
            .handler { storage.saveBoardsConfig(it.body()) }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { createOrUpdate(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { delete(it.body()) }


    private fun loadBoardsConfig() = storage
            .loadBoardsConfig()
            .getJsonObject(CogboardConstants.PROP_WIDGETS)
            .getJsonObject(CogboardConstants.PROP_WIDGETS_BY_ID)
            .forEach {
                createOrUpdate(JsonObject(it.value.toString()))
            }

    private fun createOrUpdate(config: JsonObject) {
        var newConfig = config
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(config, true)
            }
            attachEndpoint(newConfig)
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | There is widget with no ID in configuration: $config")
        }
    }

    private fun delete(config: JsonObject) {
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets.remove(id)?.stop()
        } else {
            LOGGER.error("Widget Delete | There is widget with no ID in configuration: $config")
        }
    }

    private fun attachEndpoint(config: JsonObject) {
        val endpointId = config.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = EndpointLoader.from(config(), endpointId).asJson(true)
            config.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(WidgetsController::class.java)
    }
}