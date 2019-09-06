package com.cognifide.cogboard.config

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test

internal class EndpointTest {

    private val endpoints: JsonArray = readJsonArrayFromResource("/com/cognifide/cogboard/config/endpoints-test.json")
    private val credentials: JsonArray = readJsonArrayFromResource("/com/cognifide/cogboard/config/credentials-test.json")

    @Test
    fun shouldRemoveCredentialsProp() {
        val validEndpoint = Endpoint(endpoints, credentials).readById("validEndpoint")
        assertFalse(validEndpoint.containsKey("credentials"))

        val invalidEndpoint = Endpoint(endpoints, credentials).readById("invalidEndpoint")
        assertFalse(invalidEndpoint.containsKey("credentials"))
    }

    @Test
    fun shouldAddUserAndPasswordProp() {
        val validEndpoint = Endpoint(endpoints, credentials).readById("validEndpoint")
        assert(validEndpoint.containsKey("user"))
        assert(validEndpoint.containsKey("password"))

        val invalidEndpoint = Endpoint(endpoints, credentials).readById("invalidEndpoint")
        assert(invalidEndpoint.containsKey("user"))
        assert(invalidEndpoint.containsKey("password"))
    }

    @Test
    fun checkIfUserAndPasswordAreCorrect() {
        val endpoint = Endpoint(endpoints, credentials).readById("validEndpoint")
        assertEquals("user1", endpoint.getString("user"))
        assertEquals("password1", endpoint.getString("password"))
    }

    @Test
    fun shouldReturnEmptyCredentialsForInvalidId() {
        val endpoint = Endpoint(endpoints, credentials).readById("invalidEndpoint")
        assertEquals("", endpoint.getString("user"))
        assertEquals("", endpoint.getString("password"))
    }

    @Test
    fun checkValidEndpoint() {
        val endpoint = Endpoint(endpoints, credentials).readById("validEndpoint")
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
    fun checkInvalidEndpoint() {
        val endpoint = Endpoint(endpoints, credentials).readById("invalidEndpoint")
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
        fun readJsonArrayFromResource(path: String) : JsonArray {
            val endpointsContent = EndpointTest::class.java.getResource(path).readText()
            return JsonArray(endpointsContent.trimIndent())
        }
    }
}
