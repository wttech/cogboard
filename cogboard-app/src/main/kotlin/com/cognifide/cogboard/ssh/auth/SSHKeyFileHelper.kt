package com.cognifide.cogboard.ssh.auth

import java.io.File

class SSHKeyFileHelper(
    private val id: String,
    private val key: String
) {
    private lateinit var file: File
    lateinit var path: String
        private set

    fun saveToFile() {
        getOrCreateFile()
        file.writeText(key)
    }

    private fun getOrCreateFile() {
        path = determineFilepath()
        file = File(path)
        path = file.absolutePath
    }

    private fun determineFilepath() =
        if (File("/data").exists()) "/data/$id"
        else "${System.getProperty("user.dir")}/../mnt/$id"
}
