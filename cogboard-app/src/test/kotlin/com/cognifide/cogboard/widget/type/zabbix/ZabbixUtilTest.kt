package com.cognifide.cogboard.widget.type.zabbix

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ZabbixUtilTest {

    @Test
    fun `Expect percentage value after conversion`() {
        val percentage = SAMPLE_VALUE_IN_BYTES.convertToPercentage(MAX_VALUE_100_GB)

        assertEquals(51, percentage)
    }

    companion object {
        const val MAX_VALUE_100_GB = 100
        const val SAMPLE_VALUE_IN_BYTES = 50744555432L
    }
}
