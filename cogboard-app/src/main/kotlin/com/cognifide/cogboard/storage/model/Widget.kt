package com.cognifide.cogboard.storage.model

import com.fasterxml.jackson.annotation.JsonAnyGetter
import com.fasterxml.jackson.annotation.JsonAnySetter
import com.fasterxml.jackson.annotation.JsonIgnore

data class Widget(
    val id: String,
    val type: String,
    val title: String,
    val config: WidgetConfig,
    val disabled: Boolean,
    val content: Map<String, Any>,
    @JsonIgnore
    val dynamicFields: MutableMap<String, Any> = mutableMapOf()
) {
    @JsonAnySetter
    fun setFields(name: String, value: Any) {
        dynamicFields[name] = value
    }

    @JsonAnyGetter
    fun getFields() = dynamicFields

    data class WidgetConfig(
        val columns: Int,
        val rows: Int,
        val goNewLine: Boolean
    )
}
