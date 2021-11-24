package main.kotlin.com.cognifide.cogboard.logStorage

data class LogStorageConfiguration(
    val id: String,
    val logLines: Long,
    val fileSizeMB: Long,
    val expirationDays: Long,
    val eventBusAddress: String
)
