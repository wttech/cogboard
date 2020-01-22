package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Companion.EVENT_INFO_APP
import com.cognifide.cogboard.config.service.AppInfoService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class AppInfoController : AbstractVerticle() {

    private val appInfoService: AppInfoService by lazy { AppInfoService() }
    private val factory = ControllerFactory()
    override fun start() {
        listenOnAppInfo()
    }

    private fun listenOnAppInfo() {
        factory.create(EVENT_INFO_APP, vertx, prepareInfo())
    }

    private fun prepareInfo() = mapOf<String, (JsonObject) -> String>(
            "get" to { _ -> appInfoService.loadAppInfo().toString() }
    )
}
