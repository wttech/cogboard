package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.storage.VolumeStorageFactory.info
import io.vertx.core.json.JsonObject
import java.time.LocalDateTime
import java.time.Month
import java.time.temporal.ChronoUnit

class VersionService() {

    private var config = info().loadConfig()
    private var lastCheck: LocalDateTime = LocalDateTime.of(2000, Month.FEBRUARY, 1, 0, 0)
    private var latestVersion: String = "0.0.0"
    private var latestResponse: JsonObject = JsonObject()

    fun prepareVersionResponse(): JsonObject {
        val content = mapOf(
                "latestVersion" to latestVersion,
                "latestResponse" to latestResponse
        )
        return JsonObject(content)
    }

    fun isLatestVersionAvailable(): Boolean =
            ChronoUnit.SECONDS.between(lastCheck, LocalDateTime.now()) < ChronoUnit.DAYS.duration.seconds &&
            latestVersion.compareVersionNumbers(config.getString("version")) > 0

    fun checkVersion(body: JsonObject): Boolean {
        val currentVersion = config.getString("version")
        val latestVersion = body.getString("tag_name")?.substring(1) ?: ""

        this.lastCheck = LocalDateTime.now()
        return if (latestVersion.compareVersionNumbers(currentVersion) > 0) {
            this.latestVersion = latestVersion
            this.latestResponse = body
            true
        } else
            false
    }

    private fun String.compareVersionNumbers(version: String): Int {
        val v1parts = this.split('.').map { it.toInt() }
        val v2parts = version.split('.').map { it.toInt() }

        for ((p1, p2) in v1parts.zip(v2parts)) {
            if (p1 == p2) continue
            return if (p1 > p2) 1 else -1
        }

        return v1parts.size.compareTo(v2parts.size)
    }
}
