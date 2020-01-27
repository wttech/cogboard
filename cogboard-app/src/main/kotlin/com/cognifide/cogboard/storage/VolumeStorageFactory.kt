package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType.INFO
import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.ConfigType.CREDENTIALS
import com.cognifide.cogboard.config.ConfigType.ENDPOINTS
import com.cognifide.cogboard.config.ConfigType.ADMINS
import com.cognifide.cogboard.config.validation.Validator
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.config.validation.credentials.CredentialsValidator
import com.cognifide.cogboard.config.validation.endpoints.EndpointsValidator
import com.cognifide.cogboard.config.validation.admins.AdminsValidator
import com.cognifide.cogboard.config.validation.info.InfoValidator
import io.vertx.core.logging.LoggerFactory
import java.io.File
import java.net.URL

object VolumeStorageFactory {
    private val LOGGER = LoggerFactory.getLogger(VolumeStorageFactory::class.java)

    private const val INFO_CONFIG_FILE_PATH = "/data/.version"
    private const val BOARDS_CONFIG_FILE_PATH = "/data/config.json"
    private const val ENDPOINTS_CONFIG_FILE_PATH = "/data/endpoints.json"
    private const val CREDENTIALS_CONFIG_FILE_PATH = "/data/credentials.json"
    private const val ADMINS_CONFIG_FILE_PATH = "/data/admins.json"

    fun info(): VolumeStorage {
        return createVolumeStorage(INFO, INFO_CONFIG_FILE_PATH, InfoValidator)
    }

    fun boards(): VolumeStorage {
        return createVolumeStorage(BOARDS, BOARDS_CONFIG_FILE_PATH, BoardsValidator)
    }

    fun credentials(): VolumeStorage {
        return createVolumeStorage(CREDENTIALS, CREDENTIALS_CONFIG_FILE_PATH, CredentialsValidator)
    }

    fun endpoints(): VolumeStorage {
        return createVolumeStorage(ENDPOINTS, ENDPOINTS_CONFIG_FILE_PATH, EndpointsValidator)
    }

    fun admins(): VolumeStorage {
        return createVolumeStorage(ADMINS, ADMINS_CONFIG_FILE_PATH, AdminsValidator)
    }

    fun createIfDoesNotExist(configPath: String) {
        if (!File(configPath).exists()) {
            createFile(configPath)
        }
    }

    private fun createVolumeStorage(configType: ConfigType, path: String, validator: Validator): VolumeStorage {
        createIfDoesNotExist(path)
        return VolumeStorage(configType, path, validator)
    }

    private fun createFile(configPath: String) {
        val fileContent = getResource(configPath).readText()
        File(configPath).writeText(fileContent)
        LOGGER.info("Configuration file $configPath")
    }

    private fun getFileName(configPath: String): String {
        return "/initData/${configPath.substringAfterLast("/")}"
    }

    private fun getResource(configPath: String): URL {
        return VolumeStorageFactory::class.java.getResource(getFileName(configPath))
    }
}
