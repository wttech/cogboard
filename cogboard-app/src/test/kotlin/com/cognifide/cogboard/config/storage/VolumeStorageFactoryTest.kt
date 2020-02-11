package com.cognifide.cogboard.config.storage

import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorageFactory
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.io.File

internal class VolumeStorageFactoryTest {

    private val boardPath = VolumeStorageFactoryTest::class.java.getResource("/board").path
    private val configNotExist = "$boardPath/initial-config-for-VolumeStorageFactoryTest-test.json"

    @Test
    fun `Expect config is created when not present`() {
        //when
        val underTest = VolumeStorageFactory.get(ConfigType.ADMINS, configNotExist)

        //then
        val content = JsonObject(File(configNotExist).readText())
        assertTrue(content.containsKey("admins"))
    }
}