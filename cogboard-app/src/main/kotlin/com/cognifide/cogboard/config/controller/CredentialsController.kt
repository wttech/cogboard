package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.CredentialsConfig
import com.cognifide.cogboard.config.service.CredentialsService
import com.cognifide.cogboard.storage.VolumeStorageFactory.credentials
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class CredentialsController : AbstractVerticle() {

    private lateinit var credentialsService: CredentialsService
    private lateinit var sender: ConfirmationSender

    override fun start() {
        credentialsService = CredentialsService(credentials())
        sender = ConfirmationSender(vertx)
        listenOnEndpointsUpdate()
        listenOnCredentialsDelete()
    }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_CREDENTIALS)
            .handler {
                credentialsService.save(it.body())
                it.reply(it.body())
            }

    private fun listenOnCredentialsDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_CREDENTIALS)
            .handler {
                val credentialId: String = it.body().getString(CredentialsConfig.CREDENTIAL_ID_PROP)
                credentialsService.delete(credentialId)
            }
}
