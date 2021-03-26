package com.cognifide.cogboard.utils

import com.cognifide.cogboard.utils.ExtensionFunctions.asJsonObject
import com.cognifide.cogboard.utils.ExtensionFunctions.makeUrlPublic
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ExtensionFunctionsTest {

    @Test
    fun `String ext asJsonObject() Should Create Valid Json Object`() {
        val actual = "value".asJsonObject("propName")

        Assertions.assertEquals("{\"propName\":\"value\"}", actual.toString())
    }

    @Test
    fun `String ext asJsonObject() Should Contain Value`() {
        val actual = "value".asJsonObject("propName")

        Assertions.assertEquals("value", actual.getString("propName"))
    }

    @Test
    fun `Should Replace Private with Public Secure`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Replace Private with Public Secure even when ends with slash`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Replace Private with Public`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Replace Private with Public even when ends with slash`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Leave as it was when Public`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Leave as it was when Public even when ends with slash`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Leave as it was when Public Secure`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Leave as it was when Public Secure even when ends with slash`() {
        Assertions.assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should be empty when was empty`() {
        Assertions.assertEquals("", "".makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should leave as it was when Public was empty`() {
        Assertions.assertEquals(PRIVATE_URL, PRIVATE_URL.makeUrlPublic(""))
    }

    companion object {
        const val PUBLIC_DOMAIN = "https://public.com"
        const val PUBLIC_DOMAIN_SLASH_ENDING = "https://public.com/"
        const val PUBLIC_URL = "http://public.com/someresource"
        const val PUBLIC_URL_SECURE = "https://public.com/someresource"
        const val PRIVATE_URL = "http://192.168.1.1/someresource"
        const val PRIVATE_URL_SECURE = "https://192.168.1.1/someresource"
    }
}