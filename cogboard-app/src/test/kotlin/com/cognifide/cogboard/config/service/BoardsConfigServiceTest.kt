package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorage
import com.cognifide.cogboard.storage.VolumeStorageFactory.get
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import java.io.File

internal class BoardsConfigServiceTest {
    @Test
    fun `Expect board config saved without content`() {
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        val boardConfig = "$boardPath/server-config.json"

        val contentRepository = ContentRepository(boardPath)
        val underTest = BoardsConfigService(contentRepository, configFile = boardConfig)

        //when
        val uiBoardConfigState = File("$boardPath/ui-board-config.json").readText()
        underTest.saveBoardsConfig(JsonObject(uiBoardConfigState))

        //then
        val contentOnServer = JsonObject(File(boardConfig).readText()).getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("widget1")
                .getJsonObject("content")
        assertTrue(contentOnServer.isEmpty)
    }

    @Test
    fun `Expect config merged from server board config and widget states`() {
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        val boardConfig = "$boardPath/server-board-config.json"

        val contentRepository = ContentRepository(boardPath)
        val underTest = BoardsConfigService(contentRepository, configFile = boardConfig)

        //when
        val config = underTest.loadBoardsConfig()

        //then
        assertTrue(config.getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("serverWidget1")
                .getJsonObject("content").containsKey("serverTime"))
    }

    @Test
    fun `Expect all widgets returned`(){
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        val boardConfig = "$boardPath/server-board-config.json"
        val contentRepository = ContentRepository(boardPath)
        val underTest = BoardsConfigService(contentRepository, configFile = boardConfig)

        //when
        val allWidget = underTest.getAllWidgets()

        //then
        assertTrue(allWidget.containsKey("serverWidget1"))
        assertTrue(allWidget.size() == 1)
    }

    @Test
    fun `Expect content saved`(){
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        val boardConfig = "$boardPath/server-board-config.json"

        val contentRepository = ContentRepository(boardPath)
        val underTest = BoardsConfigService(contentRepository, configFile = boardConfig)

        //when
        underTest.saveContent("testWidget", JsonObject().put("someKey", "someValue"))

        //then
        val content = JsonObject(File("$boardPath/content/testWidget.json").readText())
        assertTrue(content.containsKey("someKey"))
    }
}
