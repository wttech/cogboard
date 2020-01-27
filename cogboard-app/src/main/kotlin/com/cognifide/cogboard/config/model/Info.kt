package com.cognifide.cogboard.config.model

data class Info(
    val version: String,
    val latestVersion: String,
    val status: String,
    val latestResponse: Map<String, Any>
)
