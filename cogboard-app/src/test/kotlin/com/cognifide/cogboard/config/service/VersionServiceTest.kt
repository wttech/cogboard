package com.cognifide.cogboard.config.service

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

internal class VersionServiceTest {

    @Test
    fun `Expect false when older version given`() {
        val first = "0.0.0"
        val second = "0.0.14"

        Assertions.assertEquals(false, VersionService.isNewer(first, second))
    }

    @Test
    fun `Expect true when newer version given`() {
        val first = "20.0.0"
        val second = "1.0.0"

        Assertions.assertEquals(true, VersionService.isNewer(first, second))
    }

    @Test
    fun `Expect false when equal version given`() {
        val first = "1.0.0"
        val second = "1.0.0"

        Assertions.assertEquals(false, VersionService.isNewer(first, second))
    }
}