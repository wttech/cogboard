package com.cognifide.cogboard.config.validation.admins

import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class AdminsValidatorTest {

    @Test
    fun `Config with One User with Password is Valid`() {
        assertTrue(AdminsValidator.validate(ONE_VALID_USER))
    }

    @Test
    fun `Config with Incorrect User's Name is Invalid`() {
        assertFalse(AdminsValidator.validate(EMPTY_USER_NAME))
    }

    @Test
    fun `Config with Incorrect User's Password is Invalid`() {
        assertFalse(AdminsValidator.validate(EMPTY_USER_PASSWORD))
    }

    companion object {
        private val ONE_VALID_USER = """
        {
            "user": "admin",
            "password": "admin"
        }
        """.trimIndent()

        private val EMPTY_USER_NAME = """
        {
            "user": "",
            "password": "admin"
        }
        """.trimIndent()

        private val EMPTY_USER_PASSWORD = """
        {
            "user": "admin",
            "password": ""
        }
        """.trimIndent()
    }
}

