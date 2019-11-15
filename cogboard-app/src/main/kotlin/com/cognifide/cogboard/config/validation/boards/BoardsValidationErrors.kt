package com.cognifide.cogboard.config.validation.boards

import com.cognifide.cogboard.config.validation.ValidationErrors

class BoardsValidationErrors(override val errors: List<BoardsValidationError>) : ValidationErrors {

    override fun toString(): String {
        val builder = StringBuilder()
        errors.forEach {
            builder.append(it.board.id).append(" - ").append(it.message).append("\n")
        }
        return builder.toString()
    }
}
