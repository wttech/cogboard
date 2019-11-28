package com.cognifide.cogboard.config.helper

import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class EntityCleanupHelper(private val vertx: Vertx) {
    fun handle(oldConfig: JsonObject, newConfig: JsonObject): List<String> {
        return getWidgetIdsForPurge(oldConfig, newConfig)
            .also { list -> list.forEach { item -> sendWidgetPurgeEvent(item) } }
    }

    private fun getWidgetIdsForPurge(oldConfig: JsonObject, newConfig: JsonObject): List<String> {
        val oldBoards = getAllBoards(oldConfig)
        val newBoards = getAllBoards(newConfig)

        val newUsedWidgets = getAssignedWidgets(newBoards, newConfig)

        return getAllWidgets(oldBoards, oldConfig)
            .filter { !newUsedWidgets.contains(it) }
            .distinct()
    }

    private fun getAllWidgets(boardIds: JsonArray, config: JsonObject): List<String> {
        val boardsWidgets = getAssignedWidgets(boardIds, config)
            .map { it.toString() }

        val declaredWidgets = config
            .getJsonObject(CC.PROP_WIDGETS)
            .getJsonObject(CC.PROP_WIDGETS_BY_ID)
            .map { it.key.toString() }
            .toList()

        return boardsWidgets + declaredWidgets
    }

    private fun getAssignedWidgets(boardIds: JsonArray, config: JsonObject): List<Any> =
        boardIds
            .mapNotNull { getBoardWidgets(config, it) }
            .flatten()

    private fun getBoardWidgets(config: JsonObject, it: Any): JsonArray? =
        config
            .getJsonObject(CC.PROP_BOARDS)
            .getJsonObject(CC.PROP_BOARDS_BY_ID)
            .getJsonObject(it.toString())
            ?.getJsonArray(CC.PROP_WIDGETS)

    private fun getAllBoards(config: JsonObject) =
        config
            .getJsonObject(CC.PROP_BOARDS)
            .getJsonArray(CC.PROP_BOARDS_ALL)

    private fun sendWidgetPurgeEvent(widgetId: String) =
        vertx
            .eventBus()
            .publish(
                CC.EVENT_PURGE_WIDGET_CONFIG,
                JsonObject().put(
                    CC.PROP_ID,
                    widgetId)
            )
}
