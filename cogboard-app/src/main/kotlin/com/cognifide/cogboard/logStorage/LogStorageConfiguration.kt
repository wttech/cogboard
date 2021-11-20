package main.kotlin.com.cognifide.cogboard.logStorage

data class LogStorageConfiguration(
    val id: String,
    val logLines: Int,
    val fileSizeMB: Int,
    val expirationDays: Int
)
