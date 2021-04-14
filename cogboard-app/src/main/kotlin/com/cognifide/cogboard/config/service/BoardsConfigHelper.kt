package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class BoardsConfigHelper {
    companion object {
        fun removeBoard(config: JsonObject, id: String): JsonObject {
            val copy = config.copy()
            copy.allBoards()?.remove(id)
            copy.boardsById()?.remove(id)
            return copy
        }

        fun updateBoard(config: JsonObject, board: JsonObject): JsonObject {
            val id = board.getString(Props.ID)
            val copy = config.copy()
            val prevWidgets = copy.boardsById()?.getJsonObject(id)?.getJsonArray(Props.WIDGETS) ?: JsonArray()
            if (!copy.allBoards()?.contains(id)!!) {
                copy.allBoards()?.add(id)
            }
            if (board.widgetsNotPresent()) {
                board.put(Props.WIDGETS, prevWidgets)
            }
            copy.boardsById()?.put(id, board)
            return copy
        }
    }
}

private fun JsonObject.allBoards(): JsonArray? = this.getJsonObject(Props.BOARDS).getJsonArray(Props.BOARDS_ALL)
private fun JsonObject.boardsById(): JsonObject? = this.getJsonObject(Props.BOARDS).getJsonObject(Props.BOARDS_BY_ID)
private fun JsonObject.widgetsNotPresent() = !this.containsKey(Props.WIDGETS)
