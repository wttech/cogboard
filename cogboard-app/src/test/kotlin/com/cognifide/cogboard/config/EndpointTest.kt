package com.cognifide.cogboard.config

import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class EndpointTest {

    private lateinit var endpointsConfig: JsonObject
    private lateinit var credentialsConfig: JsonObject
    private lateinit var endpointsLoader: EndpointLoader
    private lateinit var validEndpoint: JsonObject
    private lateinit var invalidEndpoint: JsonObject

    @BeforeAll
    fun init() {
        endpointsConfig= readConfigFromResource("/com/cognifide/cogboard/config/endpoints-test.json")
        credentialsConfig = readConfigFromResource("/com/cognifide/cogboard/config/credentials-test.json")
        endpointsLoader = EndpointLoader(endpointsConfig, credentialsConfig)
        validEndpoint = endpointsLoader.loadWithSensitiveData("validEndpoint")
        invalidEndpoint = endpointsLoader.loadWithSensitiveData("invalidEndpoint")
    }

    @Test
    fun shouldRemoveCredentialsProp() {
        assertFalse(validEndpoint.containsKey("credentials"))
        assertFalse(invalidEndpoint.containsKey("credentials"))
    }

    @Test
    fun shouldAddUserAndPasswordProp() {
        assert(validEndpoint.containsKey("user"))
        assert(validEndpoint.containsKey("password"))

        assert(invalidEndpoint.containsKey("user"))
        assert(invalidEndpoint.containsKey("password"))
    }

    @Test
    fun checkIfUserAndPasswordAreCorrect() {
        assertEquals("user1", validEndpoint.getString("user"))
        assertEquals("password1", validEndpoint.getString("password"))
    }

    @Test
    fun checkIfUserAndPasswordAreEmptyForInvalidId() {
        assertEquals("", invalidEndpoint.getString("user"))
        assertEquals("", invalidEndpoint.getString("password"))
    }

    @Test
    fun shouldReturnValidCredentials() {
        val validEndpointToReturn = JsonObject("""
                    {
                      "id" : "validEndpoint",
                      "label" : "Valid Endpoint",
                      "url" : "url",
                      "publicUrl" : "Public Url",
                      "user" : "user1",
                      "password" : "password1"
                    }
                    """)

        assertEquals(validEndpointToReturn, validEndpoint)
    }

    @Test
    fun shouldReturnEmptyCredentials() {
        val invalidEndpointToReturn = JsonObject("""
                    {
                      "id" : "invalidEndpoint",
                      "label" : "Invalid Endpoint",
                      "url" : "url",
                      "user" : "",
                      "password" : ""
                    }
                    """)

        assertEquals(invalidEndpointToReturn, invalidEndpoint)
    }

    companion object {
        fun readConfigFromResource(pathToJsonResource: String) : JsonObject {
            val endpointsContent = EndpointTest::class.java.getResource(pathToJsonResource).readText()
            return JsonObject(endpointsContent.trimIndent())
        }
    }
}
