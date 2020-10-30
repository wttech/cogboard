package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants as CC
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.WhiteSpaceWidget
import com.cognifide.cogboard.widget.type.WidgetTestBase
import com.cognifide.cogboard.widget.type.zabbix.ZabbixWidget
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension::class)
class WidgetIndexTest : WidgetTestBase() {

    @Test
    fun `Given "ZabbixWidget" type expect Zabbix Widget to be created`() {
        val createdWidgetInstance = WidgetIndex.create(config("ZabbixWidget"), vertx)

        assertTrue(createdWidgetInstance is ZabbixWidget)
    }

    @Test
    fun `Given "ServiceCheckWidget" type expect Service Check Widget to be created`() {
        val createdWidgetInstance = WidgetIndex.create(config("ServiceCheckWidget"), vertx)

        assertTrue(createdWidgetInstance is ServiceCheckWidget)
    }

    @Test
    fun `Given "unknown" type expect White Space Widget to be created`() {
        val createdWidgetInstance = WidgetIndex.create(config("unknown"), vertx)

        assertTrue(createdWidgetInstance is WhiteSpaceWidget)
    }

    @Test
    fun `Available Widgets contain Zabbix Widget`() {
        val widget = WidgetIndex.availableWidgets()
                .stream()
                .map { it as JsonObject }
                .filter { it.getString(CC.PROP_DISPLAY) == "Zabbix" }
                .findFirst()
                .orElse(JsonObject())

        assertEquals("Zabbix", widget.getString(CC.PROP_DISPLAY))
        assertEquals("ZabbixWidget", widget.getString(CC.PROP_VALUE))
    }

    @Test
    fun `Available Widgets contain Service Check Widget`() {
        val widget = WidgetIndex.availableWidgets()
                .stream()
                .map { it as JsonObject }
                .filter { it.getString(CC.PROP_DISPLAY) == "Service Check" }
                .findFirst()
                .orElse(JsonObject())

        assertEquals("Service Check", widget.getString(CC.PROP_DISPLAY))
        assertEquals("ServiceCheckWidget", widget.getString(CC.PROP_VALUE))
    }

    private fun config(type: String) = JsonObject().put(CC.PROP_WIDGET_TYPE, type)

    override fun widgetName() = "not required"
}