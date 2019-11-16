package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorage
import io.restassured.internal.assertion.Assertion
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeAll

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.io.File

internal class BoardsAndWidgetsServiceTest {
    @Test
    fun saveBoardsConfig() {
        //given
        val boardPath =  BoardsAndWidgetsServiceTest::class.java.getResource("/board").path
        File("$boardPath/widgets").delete()
        File("$boardPath/widgets").mkdir()

        val conf = BoardsAndWidgetsServiceTest::class.java.getResource("/board/ui-board-config.json")
                .readText()

        val storage = VolumeStorage(ConfigType.BOARDS,
                "$boardPath/server-config.json", BoardsValidator)
        val contentRepository = ContentRepository("$boardPath/widgets")
        val underTest = BoardsAndWidgetsService(JsonObject(), storage, contentRepository)

        //when
        underTest.saveBoardsConfig(JsonObject(conf))

        //then
        assertTrue(File("$boardPath/widgets/widget1.json").exists())
    }

    @Test
    fun loadConfig() {
        //given
        val boardPath =  BoardsAndWidgetsServiceTest::class.java.getResource("/board").path

        val storage = VolumeStorage(ConfigType.BOARDS,
                "$boardPath/server-board-config.json", BoardsValidator)
        val contentRepository = ContentRepository("$boardPath")
        val underTest = BoardsAndWidgetsService(JsonObject(), storage, contentRepository)

        //when
        val config = underTest.loadBoardsConfig()

        //then
        assertTrue(config.getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("serverWidget1")
                .getJsonObject("content").containsKey("serverTime"))
    }
}