package com.cognifide.cogboard.config.model

data class Endpoint(
    val id: String,
    val label: String,
    val url: String?,
    val publicUrl: String?,
    val credentials: String?
)
