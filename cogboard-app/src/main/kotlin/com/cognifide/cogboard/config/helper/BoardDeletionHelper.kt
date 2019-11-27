package com.cognifide.cogboard.config.helper

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class BoardDeletionHelper(val vertx: Vertx) {
    fun handle(oldConfig: JsonObject, newConfig: JsonObject) {
        getDeletedBoardIds(oldConfig, newConfig)
            .mapNotNull {
                oldConfig.getJsonObject("boards")
                    .getJsonObject("boardsById")
                    .getJsonObject(it.toString())
                    ?.getJsonArray("widgets")
            }
            .flatten()
            .forEach {
                sendWidgetDeleteEvent(it.toString())
            }
    }

    private fun getDeletedBoardIds(oldConfig: JsonObject, newConfig: JsonObject): List<Any> {
        val oldBoards = oldConfig.getJsonObject("boards").getJsonArray("allBoards")
        val newBoards = newConfig.getJsonObject("boards").getJsonArray("allBoards")

        return oldBoards
            .filter { !newBoards.contains(it) }
            .toList()
    }

    private fun sendWidgetDeleteEvent(widgetId: String) = vertx
        .eventBus()
        .publish(
            CogboardConstants.EVENT_DELETE_WIDGET_CONFIG,
            JsonObject().put("id", widgetId)
        )

}
