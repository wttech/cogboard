package com.cognifide.cogboard.config.model

data class Board(
    val id: String,
    val title: String,
    val columns: Int,
    val autoSwitch: Boolean = false,
    val switchInterval: Int,
    val widgets: List<String>,
    val theme: String,
    val type: String = "WidgetBoard"
)
