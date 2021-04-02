package com.cognifide.cogboard.config.storage

import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.storage.VolumeStorage
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.DynamicTest
import org.junit.jupiter.api.TestFactory
import java.io.File
import java.util.stream.Stream

internal class VolumeStorageTest {

    private val storagePath = VolumeStorageTest::class.java.getResource("/board").path

    private val configs = listOf(
            Triple(ConfigType.ADMIN, "admin.json", Props.USER),
            Triple(ConfigType.CREDENTIALS, "credentials.json", Props.CREDENTIALS),
            Triple(ConfigType.BOARDS, "config.json", Props.BOARDS),
            Triple(ConfigType.ENDPOINTS, "endpoints.json", Props.ENDPOINTS)
    )

    @TestFactory
    fun `Expect each config file created when not present`(): Stream<DynamicTest> {
        return configs.stream().map { config ->
            val type = config.first
            val fileName = config.second
            val expectedProp = config.third

            DynamicTest.dynamicTest("Expect $fileName config is created") {
                val filePath = "$storagePath/$fileName"

                //before we make sure that file is present
                cleanup(filePath)
                assertFalse(File(filePath).exists())

                //when
                VolumeStorage(type, filePath).loadConfig()

                //then
                val content = JsonObject(File(filePath).readText())
                assertTrue(content.containsKey(expectedProp))
            }
        }
    }

    private fun cleanup(filePath: String) {
        val config = File(filePath)
        if (config.exists()) config.delete()
    }
}