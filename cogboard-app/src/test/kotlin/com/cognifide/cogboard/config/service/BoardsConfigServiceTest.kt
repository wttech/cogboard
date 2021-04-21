package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorageFactory.boards
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.io.File

internal class BoardsConfigServiceTest {

    private val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path

    private fun initService(configFilePath: String = "$boardPath/config-on-backend.json"): BoardsConfigService {
        return BoardsConfigService(contentRepository = ContentRepository(boardPath), storage = boards(configFilePath))
    }

    @Test
    fun `Expect no widget content in saved config`() {
        // given
        val differentConfigPathForSave = "$boardPath/config.json"
        val underTest = initService(differentConfigPathForSave)
        val newConfigState = File("$boardPath/config-from-frontend.json").readText()

        //when
        underTest.saveBoardsConfig(JsonObject(newConfigState))

        //then
        val contentOnServer = JsonObject(File(differentConfigPathForSave).readText()).getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("newWidget")
                .getJsonObject("content")
        assertTrue(contentOnServer.isEmpty)
    }

    @Test
    fun `Expect widget content merged to config`() {
        // given
        val underTest = initService()

        //when
        val config = underTest.loadBoardsConfig()

        //then
        assertTrue(config.getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("widgetThatIsNotEdited")
                .getJsonObject("content").containsKey("serverTime"))
    }

    @Test
    fun `Expect all widgets returned`() {
        // given
        val underTest = initService()

        //when
        val allWidget = underTest.getAllWidgets()

        //then
        assertTrue(allWidget.containsKey("widgetThatWillBeReplaced"))
        assertTrue(allWidget.containsKey("widgetThatIsNotEdited"))
        assertTrue(allWidget.size() == 2)
    }

    @Test
    fun `Expect content saved`() {
        // given
        val underTest = initService()

        //when
        underTest.saveContent("testWidget", JsonObject().put("someKey", "someValue"))

        //then
        val content = JsonObject(File("$boardPath/content/testWidget.json").readText())
        assertTrue(content.containsKey("someKey"))
        assertEquals("someValue", content.getString("someKey"))
    }
}
