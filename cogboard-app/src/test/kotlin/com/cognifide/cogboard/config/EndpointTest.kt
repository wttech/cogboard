package com.cognifide.cogboard.config

import com.cognifide.cogboard.TestHelper.Companion.readConfigFromResource
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
    fun `Should Remove Credentials Prop`() {
        assertFalse(validEndpoint.containsKey("credentials"))
        assertFalse(invalidEndpoint.containsKey("credentials"))
    }

    @Test
    fun `Should Add User And Password Prop`() {
        assert(validEndpoint.containsKey("user"))
        assert(validEndpoint.containsKey("password"))

        assert(invalidEndpoint.containsKey("user"))
        assert(invalidEndpoint.containsKey("password"))
    }

    @Test
    fun `Check If User And Password Are Correct`() {
        assertEquals("user1", validEndpoint.getString("user"))
        assertEquals("password1", validEndpoint.getString("password"))
    }

    @Test
    fun `Check If User And Password Are Empty For Invalid Id`() {
        assertEquals("", invalidEndpoint.getString("user"))
        assertEquals("", invalidEndpoint.getString("password"))
    }

    @Test
    fun `Should Return Valid Credentials`() {
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
    fun `Should Return Empty Credentials`() {
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
}
