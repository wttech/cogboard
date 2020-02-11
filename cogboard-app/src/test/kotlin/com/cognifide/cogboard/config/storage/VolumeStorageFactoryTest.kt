package com.cognifide.cogboard.config.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorageFactory
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.File

internal class VolumeStorageFactoryTest {

    private val boardPath = VolumeStorageFactoryTest::class.java.getResource("/board").path
    private val configThatShouldNotExist = "$boardPath/initial-config-for-VolumeStorageFactoryTest-test.json"

    @BeforeEach
    fun cleanup() {
        val config = File(configThatShouldNotExist)
        if (config.exists()) config.delete()
    }

    @Test
    fun `Expect config is created when not present`() {
        //before
        assertFalse(File(configThatShouldNotExist).exists())

        //when
        val underTest = VolumeStorageFactory.get(ConfigType.ADMINS, configThatShouldNotExist)

        //then
        val content = JsonObject(File(configThatShouldNotExist).readText())
        assertTrue(content.containsKey("admins"))
    }
}