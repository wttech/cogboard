package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test

internal class EndpointTest {

    private val endpoints: JsonArray = readJsonArrayFromResource("/com/cognifide/cogboard/config/endpoints-test.json", ENDPOINTS)
    private val credentials: JsonArray = readJsonArrayFromResource("/com/cognifide/cogboard/config/endpoints-test.json", CREDENTIALS)

    @Test
    fun shouldRemoveCredentialsProp() {
        val validEndpoint = Endpoint(endpoints, credentials,"validEndpoint").asJson()
        assertFalse(validEndpoint.containsKey("credentials"))

        val invalidEndpoint = Endpoint(endpoints, credentials, "invalidEndpoint").asJson()
        assertFalse(invalidEndpoint.containsKey("credentials"))
    }

    @Test
    fun shouldAddUserAndPasswordProp() {
        val validEndpoint = Endpoint(endpoints, credentials,"validEndpoint").asJson()
        assert(validEndpoint.containsKey("user"))
        assert(validEndpoint.containsKey("password"))

        val invalidEndpoint = Endpoint(endpoints, credentials, "invalidEndpoint").asJson()
        assert(invalidEndpoint.containsKey("user"))
        assert(invalidEndpoint.containsKey("password"))
    }

    @Test
    fun checkIfUserAndPasswordAreCorrect() {
        val endpoint = Endpoint(endpoints, credentials,"validEndpoint").asJson()
        assertEquals("user1", endpoint.getString("user"))
        assertEquals("password1", endpoint.getString("password"))
    }

    @Test
    fun checkIfUserAndPasswordAreEmptyForInvalidId() {
        val endpoint = Endpoint(endpoints, credentials, "invalidEndpoint").asJson()
        assertEquals("", endpoint.getString("user"))
        assertEquals("", endpoint.getString("password"))
    }

    @Test
    fun shouldReturnValidCredentials() {
        val endpoint = Endpoint(endpoints, credentials,"validEndpoint").asJson()
        val validEndpoint = JsonObject("""
                    {
                      "id" : "validEndpoint",
                      "label" : "Valid Endpoint",
                      "url" : "url",
                      "publicUrl" : "Public Url",
                      "user" : "user1",
                      "password" : "password1"
                    }
                    """)

        assertEquals(validEndpoint, endpoint)
    }

    @Test
    fun shouldReturnEmptyCredentials() {
        val endpoint = Endpoint(endpoints, credentials, "invalidEndpoint").asJson()
        val invalidEndpoint = JsonObject("""
                    {
                      "id" : "invalidEndpoint",
                      "label" : "Invalid Endpoint",
                      "url" : "url",
                      "user" : "",
                      "password" : ""
                    }
                    """)

        assertEquals(invalidEndpoint, endpoint)
    }

    companion object {
        private const val ENDPOINTS = "endpoints"
        private const val CREDENTIALS = "credentials"

        fun readJsonArrayFromResource(pathToJsonResource: String, jsonArrayId: String) : JsonArray {
            val endpointsContent = EndpointTest::class.java.getResource(pathToJsonResource).readText()
            val endpointsJson = JsonObject(endpointsContent.trimIndent())
            return endpointsJson.getJsonArray(jsonArrayId)
        }
    }
}
