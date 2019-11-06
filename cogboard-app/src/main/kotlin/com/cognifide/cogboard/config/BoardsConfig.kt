package com.cognifide.cogboard.config

import com.cognifide.cogboard.config.validation.BoardsValidation
import io.vertx.core.json.JsonObject

class BoardsConfig: Config(){

    override fun validate(configJson: JsonObject): Boolean {
        return BoardsValidation.validate(configJson)
    }

    override fun filePath() : String = BOARDS_CONFIG_FILE_PATH

    override fun type(): ConfigType = ConfigType.BOARDS

    companion object {
        private const val BOARDS_CONFIG_FILE_PATH = "/data/config.json"
    }
}