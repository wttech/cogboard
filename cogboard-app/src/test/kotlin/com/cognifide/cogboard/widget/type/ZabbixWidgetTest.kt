package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.type.zabbix.ZabbixWidget
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import com.cognifide.cogboard.TestHelper.Companion.readConfigFromResource as load

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension::class)
class ZabbixWidgetTest : WidgetTestBase() {

    private lateinit var zabbixWidgetTest: ZabbixWidget

    override fun widgetName(): String = zabbixWidgetTest.javaClass.simpleName

    override fun initWidget(): JsonObject = super.initWidget()
            .put(RANGE, JsonArray().add(20).add(60))
            .put(MAX_VALUE, 100)

    @BeforeEach
    fun initTest() {
        super.init()
    }

    @Test
    fun `Expect ok widget update message send on event bus`() {
        initZabbixWidgetWithMetric(discUsedMetric)
        val (result, content) = handleResponse(jsonFileDiscUsedMetric)

        assertUpdateDatePresent(result)
        assertLastValue("7254701317", content)
        assertName("Used disk space on \$1", content)
        assertStatus("OK", result)
        assertHistory("7254701317", "1602331216799", content)
    }

    @Test
    fun `Expect warn widget update message send on event bus`() {
        initZabbixWidgetWithMetric(heapMetric)
        val (result, content) = handleResponse(jsonFileHeapMetric)

        assertUpdateDatePresent(result)
        assertLastValue("50744555432", content)
        assertName("mem heap size", content)
        assertStatus("UNSTABLE", result)
        assertHistory("50744555432", "1602486782740", content)
    }

    @Test
    fun `Expect fail widget update message send on event bus`() {
        initZabbixWidgetWithMetric(cpuMetric)
        val (result, content) = handleResponse(jsonFileCpuMetric)

        assertUpdateDatePresent(result)
        assertLastValue("63", content)
        assertName("CPU \$2 time", content)
        assertStatus("FAIL", result)
        assertHistory("63", "1602331143732", content)
    }

    @Test
    fun `Expect unknown widget update message send on event bus`() {
        initZabbixWidgetWithMetric(uptimeMetric)
        val (result, content) = handleResponse(jsonFileUptimeMetric)

        assertUpdateDatePresent(result)
        assertLastValue("88326792", content)
        assertName("System uptime", content)
        assertStatus("NONE", result)
        assertHistory("88326792", "1602331294376", content)
    }

    private fun initZabbixWidgetWithMetric(metric: String = "") {
        val config = initWidget().put(METRIC, metric)
        zabbixWidgetTest = ZabbixWidget(vertx, config, initService())
    }

    private fun handleResponse(jsonFile: String): Pair<JsonObject, JsonObject> {
        val response = load("/com/cognifide/cogboard/widget/type/${widgetName()}/${jsonFile}")
        zabbixWidgetTest.handleResponse(response)
        return captureWhatIsSent(eventBus, captor)
    }

    private fun assertLastValue(expected: String, content: JsonObject) {
        Assertions.assertEquals(expected, content.getString("lastvalue"))
    }

    private fun assertName(expected: String, content: JsonObject) {
        Assertions.assertEquals(expected, content.getString("name"))
    }

    private fun assertHistory(expected: String, key: String, content: JsonObject) {
        Assertions.assertEquals(expected, content.getJsonObject("history").map[key])
    }

    companion object {
        private const val METRIC = "selectedZabbixMetric"
        private const val MAX_VALUE = "maxValue"
        private const val RANGE = "range"
        private const val cpuMetric = "system.cpu.util[,idle]"
        private const val jsonFileCpuMetric = "cpu.json"
        private const val discUsedMetric = "vfs.fs.size[/,used]"
        private const val heapMetric = "jmx[\\\"java.lang:type=Memory\\\",\\\"HeapMemoryUsage.used\\\"]"
        private const val jsonFileDiscUsedMetric = "disc_used.json"
        private const val uptimeMetric = "system.uptime"
        private const val jsonFileUptimeMetric = "uptime.json"
        private const val jsonFileHeapMetric = "heap.json"
    }
}