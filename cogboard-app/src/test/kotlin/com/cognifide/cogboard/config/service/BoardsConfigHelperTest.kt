package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.TestHelper.Companion.readConfigFromResource
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class BoardsConfigHelperTest {

    private lateinit var config: JsonObject
    private lateinit var board3: JsonObject

    @BeforeEach
    fun beforeEach() {
        config = readConfigFromResource("/com/cognifide/cogboard/config/config-with-2-boards.json")
        board3 = readConfigFromResource("/com/cognifide/cogboard/config/board-3.json")
        // initial check
        assertEquals(2, config.getJsonObject("boards").getJsonArray("allBoards").size(), "initial size")
        assertTrue(config.getJsonObject("boards").getJsonArray("allBoards").contains("board-1"))
        assertTrue(config.getJsonObject("boards").getJsonArray("allBoards").contains("board-2"))
        assertNotNull(config.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-1"))
        assertNotNull(config.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-2"))
    }

    @Test
    fun `Expect board will be deleted from config`() {
        val updatedConfig = BoardsConfigHelper.removeBoard(config, "board-2")

        assertEquals(
            1,
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").size(),
            "allBoards size"
        )
        assertFalse(
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").contains("board-2"),
            "allBoards should not contain board-2 string"
        )
        assertNull(
            updatedConfig.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-2"),
            "boardsById should not contain board-2 object"
        )
    }

    @Test
    fun `Expect board will be added to config`() {
        val updatedConfig = BoardsConfigHelper.updateBoard(config, board3)

        assertEquals(
            3,
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").size(),
            "allBoards size"
        )
        assertTrue(
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").contains("board-3"),
            "allBoards should contain board-3 string"
        )
        assertNotNull(
            updatedConfig.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-3"),
            "boardsById should contain board-3 object"
        )
    }

    @Test
    fun `Expect board will be updated`() {
        board3.put("id", "board-2")
        val updatedConfig = BoardsConfigHelper.updateBoard(config, board3)

        assertEquals(
            2,
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").size(),
            "allBoards size"
        )
        assertTrue(
            updatedConfig.getJsonObject("boards").getJsonArray("allBoards").contains("board-2"),
            "allBoards should contain board-2 string"
        )
        assertNotNull(
            updatedConfig.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-2"),
            "boardsById should contain board-2 object"
        )
        assertEquals(
            "TestBoard 3",
            updatedConfig.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-2")
                .getString("title")
        )
    }

    @Test
    fun `Expect widgets will not be deleted after board props updated`() {
        board3.put("id", "board-2")
        val updatedConfig = BoardsConfigHelper.updateBoard(config, board3)

        assertEquals(
            1,
            updatedConfig.getJsonObject("boards").getJsonObject("boardsById").getJsonObject("board-2")
                .getJsonArray("widgets").size(),
        "board-2 still contains widgets"
        )
    }
}

