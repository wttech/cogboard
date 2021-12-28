package com.cognifide.cogboard.logStorage.model

data class LogStorageConfiguration(
    val id: String,
    val logLines: Long,
    val fileSizeMB: Long,
    val expirationDays: Long,
    val eventBusAddress: String
)
