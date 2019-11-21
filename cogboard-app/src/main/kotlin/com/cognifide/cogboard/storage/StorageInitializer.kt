package com.cognifide.cogboard.storage

import com.cognifide.cogboard.widget.type.ExampleWidget
import io.vertx.core.logging.LoggerFactory
import java.io.File

class StorageInitializer {

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ExampleWidget::class.java)

        fun createIfDoesNotExist(configPath: String) {
            val fileNotExists = !File(configPath).exists()

            if (fileNotExists) {
                createFile(configPath.substringAfterLast("/"), "/data")
            }
        }

        private fun createFile(fileName: String, destinationPath: String) {
            val fileContent = StorageInitializer::class.java.getResource("/initData/$fileName").readText()
            val file = File("$destinationPath/$fileName")
            file.writeText(fileContent)
            LOGGER.info("Configuration file $fileName created in $destinationPath")
        }
    }
}
