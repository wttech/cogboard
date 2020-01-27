package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants.Companion.GITHUB_API
import com.cognifide.cogboard.CogboardConstants.Companion.GITHUB_REPOSITORY_LATEST_VERSION_URL
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.VolumeStorageFactory.info
import io.vertx.core.Handler
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.ext.web.client.HttpRequest
import io.vertx.ext.web.client.WebClient
import io.vertx.ext.web.client.predicate.ResponsePredicate
import io.vertx.ext.web.codec.BodyCodec
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.util.concurrent.TimeUnit

class AppInfoService(
    private val vertx: Vertx,
    private val storage: Storage = info()
) {

    private val request: HttpRequest<JsonObject> by lazy {
        WebClient.create(vertx)
            .get(GITHUB_API, GITHUB_REPOSITORY_LATEST_VERSION_URL)
            .putHeader("User-Agent", "Cogboard")
            .`as`(BodyCodec.jsonObject())
            .timeout(TIMEOUT)
            .expect(ResponsePredicate.SC_OK)
    }

    private lateinit var action: Handler<Long>
    private var config = storage.loadConfig()

    fun loadAppInfo(): JsonObject = config

    fun createCronTask() {
        action = Handler {
            executeRequest()
            vertx.setTimer(calculateDelay(), action)
        }

        vertx.setTimer(TimeUnit.SECONDS.toMillis(1), action)
    }

    private fun executeRequest() {
        request.send {
            val body = it.result().body()
            val config = storage.loadConfig()

            if (it.succeeded()) {
                val currentVersion = config.getString("version")
                val latestVersion = body.getString("tag_name")?.substring(1) ?: ""

                val compareResult = compareVersionNumbers(currentVersion, latestVersion)
                if (compareResult == -1) {
                    config.put("latestVersion", latestVersion)
                    config.put("status", "newVersion")
                } else {
                    config.put("status", "success")
                }
            } else {
                config.put("status", "error")
            }

            config.put("latestResponse", body)

            if (storage.saveConfig(config)) {
                this.config = config
            }
        }
    }

    private fun compareVersionNumbers(v1: String, v2: String): Int {
        val v1parts = v1.split('.').map { it.toInt() }
        val v2parts = v2.split('.').map { it.toInt() }

        for ((p1, p2) in v1parts.zip(v2parts)) {
            if (p1 == p2) continue
            return if (p1 > p2) 1 else -1
        }

        return v1parts.size.compareTo(v2parts.size)
    }

    private fun calculateDelay(): Long {
        val now = LocalDateTime.now()
        val next = LocalDateTime.now()
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0)
                .plusDays(1)

        return ChronoUnit.MILLIS.between(now, next)
    }

    companion object {
        const val TIMEOUT = 5000L
    }
}
