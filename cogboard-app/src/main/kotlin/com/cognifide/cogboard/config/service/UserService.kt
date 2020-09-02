package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.validation.admins.AdminsValidator
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.admin
import io.vertx.core.json.JsonObject

class UserService(
    private val storage: Storage = admin(),
    private val config: JsonObject = storage.loadConfig()
) {
    fun loadConfig(): JsonObject = admin().loadConfig()

    fun update(admin: JsonObject): JsonObject {
        val user = loadConfig()
        if (AdminsValidator.validate(admin.toString())) {
            user.mergeIn(admin, true)
        }
        storage.saveConfig(user)
        return user
    }
}
