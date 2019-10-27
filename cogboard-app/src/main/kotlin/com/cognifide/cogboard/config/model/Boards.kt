package com.cognifide.cogboard.config.model

data class Boards (
        val boardsById: Map<String, Board>,
        val allBoards: List<String>
)