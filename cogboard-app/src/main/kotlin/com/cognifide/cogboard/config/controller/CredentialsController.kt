package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.CogboardConstants.Companion.EVENT_CREDENTIALS
import com.cognifide.cogboard.CogboardConstants.Companion.PROP_PASSWORD
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import com.cognifide.cogboard.config.service.CredentialsService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class CredentialsController : AbstractVerticle() {

    private lateinit var credentialsService: CredentialsService
    private val factory = ControllerFactory()

    override fun start() {
        credentialsService = CredentialsService()
        factory.create(EVENT_CREDENTIALS, vertx, prepareConfig())

        listenOnCredentialsUpdate()
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "get" to { body -> get(body) },
            "delete" to { body -> delete(body) }
    )

    private fun get(body: JsonObject) =
            if (body.containsKey(CREDENTIAL_ID_PROP)) {
                credentialsService.getCredential(body.getString(CREDENTIAL_ID_PROP))
                        .filterSensitiveData()
                        .toString()
            } else {
                credentialsService.getCredentials()
                        .map { it as JsonObject }
                        .map { it.filterSensitiveData() }
                        .toString()
            }

    private fun JsonObject.filterSensitiveData(): JsonObject {
        this.remove(PROP_PASSWORD)
        return this
    }

    private fun delete(body: JsonObject): String {
        credentialsService.delete(body.getString(CREDENTIAL_ID_PROP))
        return body.toString()
    }

    private fun listenOnCredentialsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_CREDENTIALS)
            .handler {
                val savedCredentials = credentialsService.save(it.body()).toString()
                it.reply(savedCredentials)
            }
}
