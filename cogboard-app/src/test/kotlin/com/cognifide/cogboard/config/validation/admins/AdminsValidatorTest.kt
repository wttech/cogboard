package com.cognifide.cogboard.config.validation.admins

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class AdminsValidatorTest {

    @Test
    fun `Config with One User with Password is Valid`() {
        assertTrue(AdminsValidator.validate(ONE_VALID_USER))
    }

    @Test
    fun `Config with One User with Password and One User without password is Invalid`() {
        assertFalse(AdminsValidator.validate(ONE_INVALID_USER))
    }

    @Test
    fun `Config with No Users is Invalid`() {
        assertFalse(AdminsValidator.validate(NO_USERS))
    }

    companion object {
        private val ONE_VALID_USER = """
        {
            "admins": [
            {
                "name": "admin",
                "pass": "admin"
            }
            ]
        }
        """.trimIndent()

        private val ONE_INVALID_USER = """
        {
            "admins": [
            {
                "name": "admin",
                "pass": "admin"
            },
            {
                "name": "admin no pass",
                "pass": ""
            }
            ]
        }
        """.trimIndent()

        private val NO_USERS = """
        {
            "admins": []
        }
        """.trimIndent()
    }
}

