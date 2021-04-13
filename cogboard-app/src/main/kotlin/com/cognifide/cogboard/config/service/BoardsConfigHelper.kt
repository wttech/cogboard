package com.cognifide.cogboard.config.service

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
            val id = board.getString("id")
            val copy = config.copy()
            if (!copy.allBoards()?.contains(id)!!) {
                copy.allBoards()?.add(id)
            }
            copy.boardsById()?.put(id, board)
            return copy
        }
    }
}

private fun JsonObject.allBoards(): JsonArray? = this.getJsonObject("boards").getJsonArray("allBoards")
private fun JsonObject.boardsById(): JsonObject? = this.getJsonObject("boards").getJsonObject("boardsById")
