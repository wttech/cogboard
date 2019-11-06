package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.ConfigType.*

object ConfigFactory {
    fun resolveByType(configType: ConfigType): Config {
        return when (configType) {
            BOARDS -> BoardsConfig()
            ENDPOINTS -> EndpointsConfig()
        }
    }
}