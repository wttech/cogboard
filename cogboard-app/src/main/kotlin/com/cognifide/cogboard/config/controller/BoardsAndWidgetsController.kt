package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.docker.Validation
import com.cognifide.cogboard.storage.docker.VolumeStorage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import com.cognifide.cogboard.CogboardConstants as CC

class BoardsAndWidgetsController : AbstractVerticle() {

    private lateinit var storage: Storage
    private val widgets = mutableMapOf<String, Widget>()

    override fun start() {
        storage = VolumeStorage(vertx)
        listenOnConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
        loadBoardsConfig()
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CC.EVENT_SAVE_BOARDS_CONFIG)
            .handler { storage.saveBoardsConfig(it.body()) }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CC.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { createOrUpdate(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CC.EVENT_DELETE_WIDGET_CONFIG)
            .handler { delete(it.body()) }

    private fun delete(config: JsonObject) {
        val id = config.getString(CC.PROP_ID)

        if (id != null) {
            widgets.remove(id)?.stop()
            LOGGER.info("Widget Deleted: $config")
        } else {
            LOGGER.error("Widget Delete | There is widget with no ID in configuration: $config")
        }
    }

    private fun loadBoardsConfig() {
        val config = storage.loadBoardsConfig()
        if (config == CC.errorResponse("Config not valid")) {
            LOGGER.error("Boards config is invalid")
            throw Validation.ValidationException("Boards config is invalid")
        }

        return config.getJsonObject(CC.PROP_WIDGETS)
                .getJsonObject(CC.PROP_WIDGETS_BY_ID)
                .forEach {
                    createOrUpdate(JsonObject(it.value.toString()))
                }
    }

    private fun createOrUpdate(config: JsonObject) {
        var newConfig = config
        val id = config.getString(CC.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(config, true)
            }
            newConfig.attachEndpoint()
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | There is widget with no ID in configuration: $config")
        }
    }

    private fun JsonObject.attachEndpoint() {
        val endpointId = this.getString(CC.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = EndpointLoader.from(config(), endpointId).loadWithSensitiveData()
            this.put(CC.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsAndWidgetsController::class.java)
    }
}