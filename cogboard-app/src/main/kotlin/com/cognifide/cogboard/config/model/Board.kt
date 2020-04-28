package com.cognifide.cogboard.config.model

import com.fasterxml.jackson.annotation.JsonAnyGetter
import com.fasterxml.jackson.annotation.JsonAnySetter
import com.fasterxml.jackson.annotation.JsonIgnore

data class Board(
    val id: String,
    val title: String,
    val columns: Int = 8,
    val autoSwitch: Boolean = false,
    val switchInterval: Int,
    val widgets: List<String>,
    val theme: String,
    val type: String = "WidgetBoard",
    @JsonIgnore
    val dynamicFields: MutableMap<String, Any> = mutableMapOf()
) {
    @JsonAnySetter
    fun setFields(name: String, value: Any) {
        dynamicFields[name] = value
    }

    @JsonAnyGetter
    fun getFields() = dynamicFields
}
