package com.cognifide.cogboard.storage

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.ConfigType
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.io.File
import java.net.URL

class VolumeStorage(
    private val type: ConfigType,
    private val configFile: String = type.configFilePath()
) : Storage {

    override fun loadConfig(): JsonObject {
        createIfDoesNotExist(configFile)
        val conf = File(configFile).readText()
        return if (type.validate(conf)) JsonObject(conf)
        else CogboardConstants.errorResponse("$type config not valid")
    }

    override fun saveConfig(configJson: JsonObject): Boolean {
        createIfDoesNotExist(configFile)
        val conf = configJson.toString()
        if (type.validate(conf)) {
            File(configFile).writeText(conf)
            return true
        }

        LOGGER.error("$ERROR_MESSAGE \nconfig:\n$configJson")
        return false
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

    companion object {
        private val LOGGER: Logger = LoggerFactory.getLogger(VolumeStorage::class.java)
        const val ERROR_MESSAGE = "Configuration not saved - invalid configuration"
    }
}
