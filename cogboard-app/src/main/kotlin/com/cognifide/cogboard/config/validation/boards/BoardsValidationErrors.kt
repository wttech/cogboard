package com.cognifide.cogboard.config.validation.boards

class BoardsValidationErrors(val errors: List<BoardsValidationError>) {

    fun hasErrors() = errors.isNotEmpty()

    override fun toString(): String {
        val builder = StringBuilder()
        errors.forEach {
            builder.append(it.board.id).append(" - ").append(it.message).append("\n")
        }
        return builder.toString()
    }
}
