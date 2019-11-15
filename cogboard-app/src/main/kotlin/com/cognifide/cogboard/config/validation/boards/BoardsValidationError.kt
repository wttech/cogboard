package com.cognifide.cogboard.config.validation.boards

import com.cognifide.cogboard.config.model.Board
import com.cognifide.cogboard.config.validation.ValidationError

data class BoardsValidationError(val board: Board, override val message: String) : ValidationError
