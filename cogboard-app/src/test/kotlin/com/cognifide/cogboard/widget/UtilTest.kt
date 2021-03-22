package com.cognifide.cogboard.widget

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UtilTest {

    @Test
    fun `Should Replace Private with Public Secure`() {
        assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Replace Private with Public Secure even when ends with slash`() {
        assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Replace Private with Public`() {
        assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Replace Private with Public even when ends with slash`() {
        assertEquals(PUBLIC_URL_SECURE, PRIVATE_URL.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Leave as it was when Public`() {
        assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Leave as it was when Public even when ends with slash`() {
        assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should Leave as it was when Public Secure`() {
        assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should Leave as it was when Public Secure even when ends with slash`() {
        assertEquals(PUBLIC_URL_SECURE, PUBLIC_URL_SECURE.makeUrlPublic(PUBLIC_DOMAIN_SLASH_ENDING))
    }

    @Test
    fun `Should be empty when was empty`() {
        assertEquals("", "".makeUrlPublic(PUBLIC_DOMAIN))
    }

    @Test
    fun `Should leave as it was when Public was empty`() {
        assertEquals(PRIVATE_URL, PRIVATE_URL.makeUrlPublic(""))
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