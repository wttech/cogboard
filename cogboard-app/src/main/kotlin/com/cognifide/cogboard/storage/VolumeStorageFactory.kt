package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.ConfigType.CREDENTIALS
import com.cognifide.cogboard.config.ConfigType.ENDPOINTS
import com.cognifide.cogboard.config.ConfigType.ADMIN
import com.cognifide.cogboard.config.ConfigType.VERSION

object VolumeStorageFactory {

    fun admin(configFile: String = ADMIN.configFilePath()) = create(ADMIN, configFile)
    fun endpoints(configFile: String = ENDPOINTS.configFilePath()) = create(ENDPOINTS, configFile)
    fun credentials(configFile: String = CREDENTIALS.configFilePath()) = create(CREDENTIALS, configFile)
    fun boards(configFile: String = BOARDS.configFilePath()) = create(BOARDS, configFile)
    fun version(configFile: String = VERSION.configFilePath()) = create(VERSION, configFile)

    private fun create(type: ConfigType, configFile: String): VolumeStorage {
        return VolumeStorage(type, configFile)
    }
}
