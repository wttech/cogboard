package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.CredentialsConfig
import com.cognifide.cogboard.config.service.CredentialsService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class CredentialsController : AbstractVerticle() {

    private lateinit var credentialsService: CredentialsService

    override fun start() {
        credentialsService = CredentialsService(config(), vertx)
        listenOnCredentialsDelete()
    }

    private fun listenOnCredentialsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_CREDENTIALS)
            .handler {
                val credentialId: String = it.body().getString(CredentialsConfig.CREDENTIAL_ID_PROP)
                credentialsService.delete(credentialId)
            }
}