package com.cognifide.cogboard.storage.model

data class Widgets(
        val widgetsById: Map<String, Widget>,
        val allWidgets: List<String>
)