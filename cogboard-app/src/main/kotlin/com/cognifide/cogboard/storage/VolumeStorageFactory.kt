package com.cognifide.cogboard.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType as CT

object VolumeStorageFactory {

    fun admin(configFile: String = CT.ADMIN.configFilePath()) = create(CT.ADMIN, configFile)
    fun endpoints(configFile: String = CT.ENDPOINTS.configFilePath()) = create(CT.ENDPOINTS, configFile)
    fun credentials(configFile: String = CT.CREDENTIALS.configFilePath()) = create(CT.CREDENTIALS, configFile)
    fun boards(configFile: String = CT.BOARDS.configFilePath()) = create(CT.BOARDS, configFile)
    fun appConfig(configFile: String = CT.APP_CONFIG.configFilePath()) = create(CT.APP_CONFIG, configFile)

    private fun create(type: ConfigType, configFile: String): VolumeStorage {
        return VolumeStorage(type, configFile)
    }
}
