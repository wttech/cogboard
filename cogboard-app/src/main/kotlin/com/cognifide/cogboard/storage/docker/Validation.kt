package com.cognifide.cogboard.storage.docker

import com.cognifide.cogboard.CogboardConstants
import io.vertx.core.json.JsonObject
import java.lang.ClassCastException

class Validation {
    companion object {
        fun validate(config: JsonObject): Boolean {
            val boards = config.getJsonObject("boards")?.getJsonObject("boardsById")
            return boards != null && validateBoards(boards)
                    && config.getJsonObject("widgets")?.getJsonObject("widgetsById") != null
        }

        private fun validateBoards(boards: JsonObject): Boolean {
            val titles = mutableSetOf<String>()

            return try {
                boards.fieldNames().stream().allMatch { id ->
                    val board = boards.getJsonObject(id)
                    checkColumnsRange(board)
                            && checkTitleLength(board)
                            && checkTitleUnique(board, titles)
                            && checkAutoSwitchInterval(board)
                }
            } catch (e: ClassCastException) {
                false
            }

        }

        private fun checkColumnsRange(board: JsonObject): Boolean {
            val columns = board.getInteger("columns")
            return (columns != null && columns in CogboardConstants.PROP_BOARD_COLUMN_MIN..CogboardConstants.PROP_BOARD_COLUMN_MAX)
        }

        private fun checkTitleLength(board: JsonObject): Boolean {
            val title = board.getString("title")
            return title != null && title.length in 1..25
        }

        private fun checkTitleUnique(board: JsonObject, titles: MutableSet<String>): Boolean {
            val title = board.getString("title")
            return title != null && titles.add(title)
        }

        private fun checkAutoSwitchInterval(board: JsonObject): Boolean {
            val autoSwitch = board.getBoolean("autoSwitch")
            return when {
                autoSwitch == null -> false
                autoSwitch -> {
                    val autoSwitchInterval = board.getInteger("switchInterval")
                    autoSwitchInterval != null && autoSwitchInterval >= 3
                }
                else -> true
            }
        }
    }
}