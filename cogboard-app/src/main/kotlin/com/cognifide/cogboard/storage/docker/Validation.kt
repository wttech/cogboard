package com.cognifide.cogboard.storage.docker

import com.cognifide.cogboard.storage.model.Board
import com.cognifide.cogboard.storage.model.Config
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import com.cognifide.cogboard.CogboardConstants as CC

class Validation {
    companion object {

        private val LOGGER: Logger = LoggerFactory.getLogger(Validation::class.java)

        private val mapper = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

        fun validate(configData: JsonObject) =
                try {
                    val config = mapper.readValue<Config>(configData.toString())
                    validateBoards(config)
                } catch (error: JsonMappingException) {
                    LOGGER.error(error.message)
                    false
                }

        private fun validateBoards(config: Config): Boolean {
            val titles = mutableSetOf<String>()
            val errors = config.boards.boardsById.flatMap { m -> validateBoard(m.value, titles) }
            val validationResult = ValidationErrors(errors)
            return if (validationResult.hasErrors()) {
                LOGGER.error(validationResult)
                false
            } else {
                true
            }
        }

        private fun validateBoard(board: Board, titles: MutableSet<String>): List<ValidationError> {
            val errors = mutableListOf<ValidationError>()

            if (!checkColumnsRange(board)) {
                errors.add(ValidationError(board,
                        "Columns number should be between ${CC.PROP_BOARD_COLUMN_MIN} and " +
                                "${CC.PROP_BOARD_COLUMN_MAX}"))
            }
            if (!checkTitleLength(board)) {
                errors.add(ValidationError(board,
                        "Title length must be less than or equal to 25, and should not be empty"))
            }
            if (!checkTitleUnique(board, titles)) {
                errors.add(ValidationError(board, "Title must be unique"))
            }
            if (!checkAutoSwitchInterval(board)) {
                errors.add(ValidationError(board, "Interval cannot be smaller than 3s."))
            }

            return errors
        }

        private fun checkColumnsRange(board: Board) =
                board.columns in CC.PROP_BOARD_COLUMN_MIN..CC.PROP_BOARD_COLUMN_MAX

        private fun checkTitleLength(board: Board) = board.title.length in 1..25

        private fun checkTitleUnique(board: Board, titles: MutableSet<String>) = titles.add(board.title)

        private fun checkAutoSwitchInterval(board: Board) =
                if (board.autoSwitch) {
                    board.switchInterval >= 3
                } else true
    }

    data class ValidationError(val board: Board, val message: String)

    class ValidationErrors(val errors: List<ValidationError>) {

        fun hasErrors() = errors.isNotEmpty()

        override fun toString(): String {
            val builder = StringBuilder()
            errors.forEach {
                builder.append(it.board.id).append(" - ").append(it.message).append("\n")
            }
            return builder.toString()
        }
    }

    class ValidationException(message: String?) : Exception(message)
}
