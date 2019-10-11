package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

private class WidgetsController : BoardsController() {

    override fun start() {
        super.start()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
    }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { createOrUpdate(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { delete(it.body()) }

    private fun delete(config: JsonObject) {
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets.remove(id)?.stop()
        } else {
            LOGGER.error("Widget Delete | There is widget with no ID in configuration: $config")
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(WidgetsController::class.java)
    }
}