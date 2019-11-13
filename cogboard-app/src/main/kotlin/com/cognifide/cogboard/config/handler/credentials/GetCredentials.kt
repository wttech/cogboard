package com.cognifide.cogboard.config.handler.credentials

import com.cognifide.cogboard.config.CredentialsConfig
import com.cognifide.cogboard.config.CredentialsConfig.Companion.CREDENTIAL_ID_PROP
import com.cognifide.cogboard.config.CredentialsConfig.Companion.PASSWORD_PROP
import com.cognifide.cogboard.http.HttpConstants
import io.knotx.server.api.handler.RoutingHandlerFactory
import io.vertx.core.Handler
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.reactivex.core.Vertx
import io.vertx.reactivex.ext.web.RoutingContext

class GetCredentials : RoutingHandlerFactory {

    private val config = CredentialsConfig()

    override fun getName(): String = "credentials-get-handler"

    override fun create(vertx: Vertx?, config: JsonObject?): Handler<RoutingContext> = Handler { event ->
        val credentialId = event.request().getParam(PARAM_CREDENTIAL_ID)
        val response = if (credentialId != null) getCredentialById(credentialId) else getAllCredentials()
        event.response()
                .putHeader(HttpConstants.HEADER_CONTENT_TYPE, HttpConstants.CONTENT_TYPE_JSON)
                .end(response)
    }

    private fun getCredentialById(credentialId: String): String {
        val credential: JsonObject =
                JsonArray(getAllCredentials()).getById(credentialId)
                        ?: JsonObject().put(ERROR_MESSAGE, "Credential with ID $credentialId doesn't exist")
        return credential.encode()
    }

    private fun JsonArray.getById(id: String): JsonObject? {
        return this.map { it as JsonObject }
                .filter { it.getValue(CREDENTIAL_ID_PROP) == id }
                .getOrNull(0)
    }

    private fun getAllCredentials(): String {
        val credentials = config.getCredentials()
        val credentialsWithoutSensitiveData = filterSensitiveData(credentials)
        return credentialsWithoutSensitiveData.encode()
    }

    private fun filterSensitiveData(credentials: JsonArray): JsonArray {
        credentials.stream().forEach {
            if (it is JsonObject) {
                it.filterSensitiveData()
            }
        }
        return credentials
    }

    private fun JsonObject.filterSensitiveData() {
        this.remove(PASSWORD_PROP)
    }

    companion object {
        private const val ERROR_MESSAGE: String = "error"
        internal const val PARAM_CREDENTIAL_ID: String = "id"
    }
}