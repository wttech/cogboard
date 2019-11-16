package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.*

import org.junit.jupiter.api.Test
import java.io.File

internal class BoardsAndWidgetsServiceTest {

    @Test
    fun saveBoardsConfig() {
        //given
        val conf = File("D:/Projects/cogboard/cogboard/mnt/config.json").readText()

        val storage = VolumeStorage(ConfigType.BOARDS,
                "D:/Projects/cogboard/cogboard/mnt/config.json", BoardsValidator)
        val contentRepository = ContentRepository("D:/Projects/cogboard/cogboard/mnt")
        val underTest = BoardsAndWidgetsService(JsonObject(), storage, contentRepository)

        //when
        underTest.saveBoardsConfig(JsonObject(conf))

        //then

    }
}