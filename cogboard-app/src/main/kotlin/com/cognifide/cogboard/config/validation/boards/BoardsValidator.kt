package com.cognifide.cogboard.config.validation.boards

import com.cognifide.cogboard.config.model.Board
import com.cognifide.cogboard.config.model.Config
import com.cognifide.cogboard.config.validation.Validator
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import com.cognifide.cogboard.CogboardConstants as CC

object BoardsValidator : Validator {

    private val LOGGER: Logger = LoggerFactory.getLogger(BoardsValidator::class.java)

    private val mapper = jacksonObjectMapper().disable(MapperFeature.ALLOW_COERCION_OF_SCALARS)

    override fun validate(config: JsonObject): Boolean =
            try {
                val boardsConfig = mapper.readValue<Config>(config.toString())
                validateBoards(boardsConfig)
            } catch (error: JsonMappingException) {
                LOGGER.error(error.message)
                false
            }

    private fun validateBoards(config: Config): Boolean {
        val titles = mutableSetOf<String>()
        val errors = config.boards.boardsById.flatMap { m -> validateBoard(m.value, titles) }
        val validationResult = BoardsValidationErrors(errors)
        return if (validationResult.hasErrors()) {
            LOGGER.error(validationResult)
            false
        } else {
            true
        }
    }

    private fun validateBoard(board: Board, titles: MutableSet<String>): List<BoardsValidationError> {
        val errors = mutableListOf<BoardsValidationError>()

        if (!checkColumnsRange(board))
            errors.add(BoardsValidationError(board,
                    "Columns number should be between ${CC.PROP_BOARD_COLUMN_MIN} and " +
                            "${CC.PROP_BOARD_COLUMN_MAX}"))
        if (!checkTitleLength(board))
            errors.add(BoardsValidationError(board,
                    "Title length must be less than or equal to 25, and should not be empty"))
        if (!checkTitleUnique(board, titles))
            errors.add(BoardsValidationError(board, "Title must be unique"))
        if (!checkAutoSwitchInterval(board))
            errors.add(BoardsValidationError(board, "Interval cannot be smaller than 3s."))

        return errors
    }

    private fun checkColumnsRange(board: Board) =
            board.columns in CC.PROP_BOARD_COLUMN_MIN..CC.PROP_BOARD_COLUMN_MAX

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
}
