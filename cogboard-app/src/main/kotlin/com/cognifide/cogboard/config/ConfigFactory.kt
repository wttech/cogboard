package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.ConfigType.BOARDS
import com.cognifide.cogboard.config.ConfigType.CREDENTIALS
import com.cognifide.cogboard.config.ConfigType.ENDPOINTS

object ConfigFactory {

    fun getByType(configType: ConfigType): Config {
        return when (configType) {
            BOARDS -> BoardsConfig()
            CREDENTIALS -> CredentialsConfig()
            ENDPOINTS -> EndpointsConfig()
        }
    }
}
