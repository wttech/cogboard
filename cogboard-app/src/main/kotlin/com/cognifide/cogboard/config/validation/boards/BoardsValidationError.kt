package com.cognifide.cogboard.config.validation.boards

import com.cognifide.cogboard.config.model.Board

data class BoardsValidationError(val board: Board, val message: String)