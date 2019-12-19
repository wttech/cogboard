package com.cognifide.cogboard.config.controller

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import com.cognifide.cogboard.config.CredentialsConfig.Companion.PASSWORD_PROP
import com.cognifide.cogboard.config.service.CredentialsService
import com.cognifide.cogboard.storage.VolumeStorageFactory.credentials
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject

class CredentialsController : AbstractVerticle() {

    private lateinit var credentialsService: CredentialsService
    private val factory = ControllerFactory()

    override fun start() {
        credentialsService = CredentialsService(credentials())
        factory.create(CogboardConstants.EVENT_CREDENTIALS, vertx, prepareConfig())
    }

    private fun prepareConfig() = mapOf<String, (JsonObject) -> String>(
                    "update" to { body -> credentialsService.save(body).toString() },
                    "delete" to { body -> delete(body) },
                    "get" to { body -> get(body) }
            )

    private fun delete(body: JsonObject): String {
        credentialsService.delete(body.getString(CREDENTIAL_ID_PROP))
        return body.toString()
    }

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
        this.remove(PASSWORD_PROP)
        return this
    }
}
