package com.cognifide.cogboard.widget.type

import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test

class BambooDeploymentWidgetTest : WidgetTestBase() {
    private lateinit var underTest: BambooDeploymentWidget

    override fun widgetName(): String = underTest.javaClass.simpleName

    override fun initWidget(): JsonObject =
            super.initWidget()
                    .put("endpoint",
                            JsonObject().put("url", "https://test.bamboo.com"))

    @BeforeEach
    fun initForTest() {
        super.init()

        underTest = BambooDeploymentWidget(vertx, initWidget(), initService())
    }

    @Test
    fun `Expect success widget update message send on event bus`() {
        val (result, content) = sendResponseWithCapture(successResponse)

        assertUpdateDatePresent(result)
        assertStatus("OK", result)
        assertURL("https://test.bamboo.com/deploy/viewDeploymentResult.action?deploymentResultId=47743263", content)
        assertReleaseName("release-1440", content)
        assertLifeCycleState("FINISHED", content)
        assertDeploymentState("SUCCESS", content)
    }

    @Test
    fun `Expect fail widget update message send on event bus`() {
        val (result, content) = sendResponseWithCapture(failResponse)

        assertUpdateDatePresent(result)
        assertStatus("FAIL", result)
        assertURL("https://test.bamboo.com/deploy/viewDeploymentResult.action?deploymentResultId=47743118", content)
        assertReleaseName("release-1377", content)
        assertLifeCycleState("FINISHED", content)
        assertDeploymentState("FAILED", content)
    }

    @Test
    fun `Expect in-progress widget update message send on event bus`() {
        val (result, content) = sendResponseWithCapture(inProgressResponse)

        assertUpdateDatePresent(result)
        assertStatus("IN_PROGRESS", result)
        assertURL("https://test.bamboo.com/deploy/viewDeploymentResult.action?deploymentResultId=47743269", content)
        assertReleaseName("release-1442", content)
        assertLifeCycleState("IN_PROGRESS", content)
        assertDeploymentState("UNKNOWN", content)
    }

    private fun sendResponseWithCapture(response: JsonObject): Pair<JsonObject, JsonObject> {
        underTest.handleResponse(response)
        return captureWhatIsSent(eventBus, captor)
    }

    private fun assertReleaseName(expected: String, result: JsonObject) {
        Assertions.assertEquals(expected, result.getString("releaseName"))
    }

    private fun assertLifeCycleState(expected: String, result: JsonObject) {
        Assertions.assertEquals(expected, result.getString("lifeCycleState"))
    }

    private fun assertDeploymentState(expected: String, result: JsonObject) {
        Assertions.assertEquals(expected, result.getString("deploymentState"))
    }
}
