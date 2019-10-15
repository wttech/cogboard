package com.cognifide.cogboard.storage.docker

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.model.Board
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject
import java.util.stream.Collectors

class Validation {
    companion object {

        private val mapper = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

        fun validate(config: JsonObject): Boolean {
            val boards = config.getJsonObject("boards")?.getJsonObject("boardsById")
            return boards != null && validateBoards(boards)
                    && hasWidgets(config)
        }

        private fun validateBoards(boardsData: JsonObject): Boolean {
            val titles = mutableSetOf<String>()

            val boards = mapJsonToObject(boardsData)

            return boards?.all {
                checkColumnsRange(it)
                    && checkTitleLength(it)
                    && checkTitleUnique(it, titles)
                    && checkAutoSwitchInterval(it)
            } ?: false
        }

        private fun mapJsonToObject(boards: JsonObject) =
                try {
                    boards.fieldNames().stream().map {
                        val board = boards.getJsonObject(it)
                        mapper.readValue<Board>(board.toString())
                    }.collect(Collectors.toList())
                } catch (e: JsonMappingException) {
                    null
                }


        private fun checkColumnsRange(board: Board) =
                board.columns in CogboardConstants.PROP_BOARD_COLUMN_MIN..CogboardConstants.PROP_BOARD_COLUMN_MAX

        private fun checkTitleLength(board: Board) =
                board.title.length in 1..25

        private fun checkTitleUnique(board: Board, titles: MutableSet<String>) =
                titles.add(board.title)

        private fun checkAutoSwitchInterval(board: Board) =
                when {
                    board.autoSwitch -> {
                        board.switchInterval >= 3
                    }
                    else -> true
                }

        private fun hasWidgets(config: JsonObject) =
                config.getJsonObject("widgets")?.getJsonObject("widgetsById") != null
    }

    class ValidationException(message: String?) : Exception(message)
}