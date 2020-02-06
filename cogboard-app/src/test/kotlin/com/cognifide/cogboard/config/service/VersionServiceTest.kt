package com.cognifide.cogboard.config.service

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class VersionServiceTest {

    @Test
    fun `Expect -1 when 0-0-0 less than 0-0-1`() {
        val first = "0.0.0"
        val second = "0.0.14"

        Assertions.assertEquals(-1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect -1 when 0-0-0 less than 0-1-0`() {
        val first = "0.0.0"
        val second = "0.15.0"

        Assertions.assertEquals(-1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect -1 when 0-0-0 less than 1-0-0`() {
        val first = "0.0.0"
        val second = "17.0.0"

        Assertions.assertEquals(-1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect 1 when 2-0-0 bigger than 1-0-0`() {
        val first = "20.0.0"
        val second = "1.0.0"

        Assertions.assertEquals(1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect 1 when 1-1-0 bigger than 1-0-0`() {
        val first = "1.1.0"
        val second = "1.0.0"

        Assertions.assertEquals(1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect 1 when 1-0-1 bigger than 1-0-0`() {
        val first = "1.0.1"
        val second = "1.0.0"

        Assertions.assertEquals(1, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect 0 when 1-1-1 equal to 1-1-1`() {
        val first = "1.1.1"
        val second = "1.1.1"

        Assertions.assertEquals(0, VersionService.compareVersionNumbers(first, second))
    }

    @Test
    fun `Expect 1 when 1-0-0 bigger than 1-0`() {
        val first = "1.0.0"
        val second = "1.0"

        Assertions.assertEquals(1, VersionService.compareVersionNumbers(first, second))
    }
}