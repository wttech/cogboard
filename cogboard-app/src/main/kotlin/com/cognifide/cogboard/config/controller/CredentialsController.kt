package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants.Event
import com.cognifide.cogboard.CogboardConstants.Props
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import com.cognifide.cogboard.config.service.CredentialsService
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class CredentialsController : AbstractVerticle() {

    private lateinit var credentialsService: CredentialsService
    private val factory = ControllerFactory()

    override fun start() {
        credentialsService = CredentialsService()
        factory.create(Event.CREDENTIALS, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
            "get" to { body -> get(body) },
            "update" to { body -> update(body) },
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
        this.remove(Props.PASSWORD)
        this.remove(Props.SSH_KEY)
        return this
    }

    private fun update(body: JsonObject): String {
        credentialsService.save(body)
        return body.toString()
    }

    private fun delete(body: JsonObject): String {
        credentialsService.delete(body.getString(CREDENTIAL_ID_PROP))
        return body.toString()
    }
}
