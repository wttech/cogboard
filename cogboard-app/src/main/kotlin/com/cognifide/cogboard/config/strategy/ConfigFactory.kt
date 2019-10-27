package com.cognifide.cogboard.config.strategy

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.ConfigType.*

class ConfigFactory {
    companion object {
        fun resolveStrategy(configType: ConfigType): Config {
            return when (configType) {
                BOARDS -> BoardsConfig()
                ENDPOINTS -> EndpointsConfig()
            }
        }
    }
}