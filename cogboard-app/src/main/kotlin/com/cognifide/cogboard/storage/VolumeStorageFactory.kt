package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType

import io.vertx.core.logging.LoggerFactory
import java.io.File
import java.net.URL

object VolumeStorageFactory {
    private val LOGGER = LoggerFactory.getLogger(VolumeStorageFactory::class.java)

    fun get(type: ConfigType, configFile: String = type.configFile()): VolumeStorage {
        createIfDoesNotExist(configFile)
        return VolumeStorage(type, configFile)
    }

    private fun createIfDoesNotExist(configPath: String) {
        if (!File(configPath).exists()) {
            createFile(configPath)
        }
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
