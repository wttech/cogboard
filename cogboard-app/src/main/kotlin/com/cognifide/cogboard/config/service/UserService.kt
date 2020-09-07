package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.PROP_CURRENT_PASSWORD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_NEW_PASSWORD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_PASSWORD
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_USER
import com.cognifide.cogboard.config.model.Admin
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.admin
import io.vertx.core.json.JsonObject

class UserService(
    private val storage: Storage = admin(),
    private val config: JsonObject = storage.loadConfig()
) {
    fun loadConfig(): JsonObject = admin().loadConfig()

    fun save(newLoginData: JsonObject): JsonObject {
        val wrongPassMsg = config.getString("wrongPassMsg") ?: "Please, enter correct Password"
        val admin = newLoginData.toAdmin()
        val currentPassword = newLoginData.getString(PROP_CURRENT_PASSWORD)
        return if (checkCurrentPassword(currentPassword)) {
            update(admin)
            response()
        } else response(wrongPassMsg)
    }

    private fun checkCurrentPassword(currentPassword: String): Boolean {
        return config.getString(PROP_PASSWORD) == currentPassword
    }

    private fun update(admin: JsonObject) {
        config.mergeIn(admin, true)
        storage.saveConfig(config)
    }

    private fun JsonObject.toAdmin(): JsonObject {
        val user = config.getString(PROP_USER)
        val newPassword = this.getString(PROP_NEW_PASSWORD)
        return JsonObject.mapFrom(Admin(user, newPassword))
    }

    private fun response(message: String = ""): JsonObject {
        return JsonObject()
                .put("message", message)
    }
}
