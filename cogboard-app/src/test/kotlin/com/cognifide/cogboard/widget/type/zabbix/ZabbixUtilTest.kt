package com.cognifide.cogboard.widget.type.zabbix

import com.cognifide.cogboard.widget.Widget
import io.vertx.core.json.JsonArray
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ZabbixUtilTest {

    @Test
    fun `Expect percentage value after conversion`() {
        val percentage = SAMPLE_VALUE_IN_BYTES.convertToPercentage(MAX_VALUE_100_GB)

        assertEquals(51, percentage)
    }

    @Test
    fun `Expect OK status for value less than start of range value`() {
        val status = status(59, range)

        assertEquals(Widget.Status.OK, status)
    }

    @Test
    fun `Expect UNSTABLE status for start of range value`() {
        val status = status(60, range)

        assertEquals(Widget.Status.UNSTABLE, status)
    }

    @Test
    fun `Expect UNSTABLE status for value less than end of range value`() {
        val status = status(79, range)

        assertEquals(Widget.Status.UNSTABLE, status)
    }

    @Test
    fun `Expect FAIL status for end of range value`() {
        val status = status(80, range)

        assertEquals(Widget.Status.FAIL, status)
    }

    companion object {
        const val MAX_VALUE_100_GB = 100
        const val SAMPLE_VALUE_IN_BYTES = 50744555432L
        val range: JsonArray = JsonArray().add(60).add(80)
    }
}
