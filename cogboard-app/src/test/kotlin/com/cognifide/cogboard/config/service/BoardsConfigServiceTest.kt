package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import java.io.File

internal class BoardsConfigServiceTest {
    @Test
    @DisplayName("Expect board config and content saved in separate files")
    fun saveBoardsConfig() {
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        clearContentDest(boardPath)

        val boardConfigDest = "$boardPath/server-config.json"
        val contentDest = "$boardPath/widgets"
        val uiBoardConfigState = File("$boardPath/ui-board-config.json").readText()
        val (storage, contentRepository) =
                prepareRepositories(boardConfigDest, contentDest)

        val underTest = BoardsConfigService(storage, contentRepository)

        //when
        underTest.saveBoardsConfig(JsonObject(uiBoardConfigState))

        //then
        assertTrue(File("$boardPath/widgets/widget1.json").exists())
    }

    private fun clearContentDest(boardPath: String?) {
        File("$boardPath/widgets").delete()
        File("$boardPath/widgets").mkdir()
    }

    @Test
    @DisplayName("Expect config merged from server board config and widget states")
    fun loadConfig() {
        //given
        val boardPath = BoardsConfigServiceTest::class.java.getResource("/board").path
        val boardConfigDest = "$boardPath/server-board-config.json"
        val (storage, contentRepository) =
                prepareRepositories(boardConfigDest, boardPath)
        val underTest = BoardsConfigService(storage, contentRepository)

        //when
        val config = underTest.loadBoardsConfig()

        //then
        assertTrue(config.getJsonObject("widgets")
                .getJsonObject("widgetsById")
                .getJsonObject("serverWidget1")
                .getJsonObject("content").containsKey("serverTime"))
    }

    private fun prepareRepositories(boardConfigDest: String,
                                    contentDest: String)
            : Pair<VolumeStorage, ContentRepository> {
        val storage = VolumeStorage(ConfigType.BOARDS, boardConfigDest, BoardsValidator)
        val contentRepository = ContentRepository(contentDest)
        return storage to contentRepository
    }
}
