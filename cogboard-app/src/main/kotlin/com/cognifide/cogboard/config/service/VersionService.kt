package com.cognifide.cogboard.config.service

import io.vertx.core.json.JsonObject
import java.time.LocalDateTime
import java.time.Month
import java.time.temporal.ChronoUnit

class VersionService {

    private var lastCheck: LocalDateTime = LocalDateTime.of(YEAR_INIT, Month.FEBRUARY, DAY_INIT, HOUR_INIT, MINUTE_INIT)
    private var latestVersion: String = "0.0.0"
    private var latestResponse: JsonObject = JsonObject()
    private val runningVersion: String = System.getenv("COGBOARD_VERSION")

    fun prepareVersionResponse(): JsonObject {
        val content = mapOf(
                "latestVersion" to latestVersion,
                "latestResponse" to latestResponse
        )
        return JsonObject(content)
    }

    fun isLatestVersionAvailable(): Boolean =
            ChronoUnit.SECONDS.between(lastCheck, LocalDateTime.now()) < ChronoUnit.DAYS.duration.seconds &&
            isNewer(latestVersion, runningVersion)

    fun checkVersion(body: JsonObject): Boolean {
        val repoLatestVersion = body.getString("tag_name")?.substring(1) ?: ""
        if (repoLatestVersion.isValid()) {
            this.latestVersion = repoLatestVersion
        }

        this.lastCheck = LocalDateTime.now()
        return if (isNewer(latestVersion, runningVersion)) {
            this.latestResponse = body
            true
        } else false
    }

    private fun String.isValid() = this.matches(VALID_PATTERN)

    companion object {
        const val YEAR_INIT = 2000
        const val DAY_INIT = 1
        const val HOUR_INIT = 0
        const val MINUTE_INIT = 0
        val VALID_PATTERN = Regex("\\d+\\.\\d+\\.\\d+")

        fun isNewer(newValue: String, oldValue: String = "0.0.0"): Boolean {
            val v1parts = newValue.split('.').map { it.toInt() }
            val v2parts = oldValue.split('.').map { it.toInt() }

            for ((p1, p2) in v1parts.zip(v2parts)) {
                if (p1 == p2) continue
                return p1 > p2
            }

            return v1parts.size.compareTo(v2parts.size) == 1
        }
    }
}
