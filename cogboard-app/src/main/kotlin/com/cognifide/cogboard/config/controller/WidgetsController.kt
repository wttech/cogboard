package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.helper.EntityCleanupHelper
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.config.service.WidgetRuntimeService
import com.cognifide.cogboard.storage.ContentRepository
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class WidgetsController : AbstractVerticle() {

    private lateinit var boardsConfigService: BoardsConfigService
    private lateinit var widgetRuntimeService: WidgetRuntimeService
    override fun start() {
        val contentRepository = ContentRepository()
        boardsConfigService = BoardsConfigService(
                contentRepository,
                EntityCleanupHelper(vertx))

        val allWidgets = boardsConfigService.getAllWidgets()
        widgetRuntimeService =
                WidgetRuntimeService(vertx, contentRepository)
                        .init(allWidgets)

        listenOnWidgetUpdate()
        listenOnWidgetContentUpdate()
        listenOnWidgetDelete()
        listenOnWidgetPurge()

        listenOnWidgetRefresh()
    }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.UPDATE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.createOrUpdateWidget(it.body()) }

    private fun listenOnWidgetRefresh() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.REFRESH_WIDGET_CONFIG)
            .handler {
                val ids = it.body().getValue(Props.ENDPOINTS)
                widgetRuntimeService.reloadWidgetsWithChangedEndpoints(ids as JsonArray)
            }

    private fun listenOnWidgetContentUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.UPDATE_WIDGET_CONTENT_CONFIG)
            .handler {
                widgetRuntimeService.handleWidgetContentUpdate(it.body())
            }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.DELETE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.destroyWidget("Delete", it.body()) }

    private fun listenOnWidgetPurge() = vertx
            .eventBus()
            .consumer<JsonObject>(Event.PURGE_WIDGET_CONFIG)
            .handler { widgetRuntimeService.destroyWidget("Purge", it.body()) }
}
