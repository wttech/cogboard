package com.cognifide.cogboard.storage.model

data class Board(
        var id: String,
        var title: String,
        var columns: Int,
        var autoSwitch: Boolean = false,
        var switchInterval: Int,
        var widgets: Array<String>,
        var theme: String
)