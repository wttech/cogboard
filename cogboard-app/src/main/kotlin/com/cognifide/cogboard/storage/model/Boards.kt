package com.cognifide.cogboard.storage.model

data class Boards (
        val boardsById: Map<String, Board>,
        val allBoards: List<String>
)