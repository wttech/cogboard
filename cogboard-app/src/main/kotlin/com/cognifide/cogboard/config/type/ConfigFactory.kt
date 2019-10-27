package com.cognifide.cogboard.config.type

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType.*

class ConfigFactory {
    companion object {
        fun resolveByType(configType: ConfigType): Config {
            return when (configType) {
                BOARDS -> BoardsConfig()
                ENDPOINTS -> EndpointsConfig()
            }
        }
    }
}