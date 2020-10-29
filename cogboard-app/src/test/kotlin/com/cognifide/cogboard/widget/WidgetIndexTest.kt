package com.cognifide.cogboard.widget

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.WhiteSpaceWidget
import com.cognifide.cogboard.widget.type.WidgetTestBase
import com.cognifide.cogboard.widget.type.ZabbixWidgetTest
import com.cognifide.cogboard.widget.type.zabbix.ZabbixWidget
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions
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

        Assertions.assertTrue(createdWidgetInstance is ZabbixWidget)
    }

    @Test
    fun `Given "ServiceCheckWidget" type expect Service Check Widget to be created`() {
        val createdWidgetInstance = WidgetIndex.create(config("ServiceCheckWidget"), vertx)

        Assertions.assertTrue(createdWidgetInstance is ServiceCheckWidget)
    }

    @Test
    fun `Given "unknown" type expect White Space Widget to be created`() {
        val createdWidgetInstance = WidgetIndex.create(config("unknown"), vertx)

        Assertions.assertTrue(createdWidgetInstance is WhiteSpaceWidget)
    }

    @Test
    fun `Available Widgets contain Zabbix Widget`() {
        val availableWidgets = WidgetIndex.availableWidgets()

        Assertions.assertTrue(availableWidgets.containsKey("Zabbix Widget"))
        Assertions.assertTrue(availableWidgets.getString("Zabbix Widget") == "ZabbixWidget")
    }

    @Test
    fun `Available Widgets contain Service Check Widget`() {
        val availableWidgets = WidgetIndex.availableWidgets()

        Assertions.assertTrue(availableWidgets.containsKey("Service Check Widget"))
        Assertions.assertTrue(availableWidgets.getString("Service Check Widget") == "ServiceCheckWidget")
    }

    private fun config(type: String) = JsonObject().put(CogboardConstants.PROP_WIDGET_TYPE, type)

    override fun widgetName() = "not required"
}