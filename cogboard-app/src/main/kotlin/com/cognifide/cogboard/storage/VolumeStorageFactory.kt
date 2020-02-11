package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.ConfigType.CREDENTIALS
import com.cognifide.cogboard.config.ConfigType.ENDPOINTS
import com.cognifide.cogboard.config.ConfigType.ADMINS

import io.vertx.core.logging.LoggerFactory
import java.io.File
import java.net.URL

object VolumeStorageFactory {
    private val LOGGER = LoggerFactory.getLogger(VolumeStorageFactory::class.java)

    fun admins(configFile: String = ADMINS.configFilePath()) = create(ADMINS, configFile)
    fun endpoints(configFile: String = ENDPOINTS.configFilePath()) = create(ENDPOINTS, configFile)
    fun credentials(configFile: String = CREDENTIALS.configFilePath()) = create(CREDENTIALS, configFile)
    fun boards(configFile: String = BOARDS.configFilePath()) = create(BOARDS, configFile)

    internal fun create(type: ConfigType, configFile: String): VolumeStorage {
        createIfDoesNotExist(configFile)
        return VolumeStorage(type, configFile)
    }

    private fun createIfDoesNotExist(configPath: String) {
        if (!File(configPath).exists()) {
            createFile(configPath)
        }
    }

    private fun createFile(configPath: String) {
        val initFileName = getInitFileName(configPath)
        val fileContent = getResource(initFileName).readText()
        File(configPath).writeText(fileContent)
        LOGGER.info("Configuration file created: $configPath")
    }

    private fun getInitFileName(configPath: String): String {
        return "/initData/${configPath.substringAfterLast("/")}"
    }

    private fun getResource(initFileName: String): URL {
        return VolumeStorageFactory::class.java.getResource(initFileName)
    }
}
