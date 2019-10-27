package com.cognifide.cogboard.config.model

data class Widgets(
        val widgetsById: Map<String, Widget>,
        val allWidgets: List<String>
)