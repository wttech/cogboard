package com.cognifide.cogboard.config.model

data class Credential(
    val id: String,
    val label: String,
    val user: String,
    val password: String?,
    val token: String?,
    val sshKey: String?,
    val sshKeyPassphrase: String?
)
