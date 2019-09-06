package com.cognifide.cogboard.test.config

import com.cognifide.cogboard.config.Endpoint
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test

internal class EndpointTest {

    private val endpoints: JsonArray = JsonArray(
            """
                [
                  {
                    "id": "validEndpoint",
                    "label": "Valid Endpoint",
                    "url": "url",
                    "publicUrl": "Public Url",
                    "credentials": "credentials1"
                  },
                  {
                    "id": "invalidEndpoint",
                    "label": "Invalid Endpoint",
                    "url": "url",
                    "credentials": "nonExistingCredentials"
                  }
                ]
            """.trimIndent())

    private val credentials: JsonArray = JsonArray(
            """
                [
                  {
                    "id": "credentials1",
                    "label": "My Credentials 1",
                    "user": "user1",
                    "password": "password1"
                  },
                  {
                    "id": "credentials2",
                    "label": "My Credentials 2",
                    "user": "user2",
                    "password": "password2"
                  }
                ]
            """.trimIndent())

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
}
