package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.ConfigType.CREDENTIALS
import com.cognifide.cogboard.config.ConfigType.ENDPOINTS
import com.cognifide.cogboard.config.ConfigType.ADMINS
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.config.validation.admins.AdminsValidator

object VolumeStorageFactory {
    private const val BOARDS_CONFIG_FILE_PATH = "/data/config.json"
    private const val ENDPOINTS_CONFIG_FILE_PATH = "/data/endpoints.json"
    private const val CREDENTIALS_CONFIG_FILE_PATH = "/data/credentials.json"
    private const val ADMINS_CONFIG_FILE_PATH = "/data/admins.json"

    fun boards(): VolumeStorage {
        return VolumeStorage(BOARDS, BOARDS_CONFIG_FILE_PATH, BoardsValidator)
    }

    fun credentials(): VolumeStorage {
        return VolumeStorage(CREDENTIALS, CREDENTIALS_CONFIG_FILE_PATH, CredentialsValidator)
    }

    fun endpoints(): VolumeStorage {
        return VolumeStorage(ENDPOINTS, ENDPOINTS_CONFIG_FILE_PATH, EndpointsValidator)
    }

    fun admins(): VolumeStorage {
        return VolumeStorage(ADMINS, ADMINS_CONFIG_FILE_PATH, AdminsValidator)
    }
}
