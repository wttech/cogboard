package com.cognifide.cogboard.widget.type

import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Assertions
import com.cognifide.cogboard.config.ConfigType
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.config.service.BoardsConfigServiceTest
import com.cognifide.cogboard.config.validation.boards.BoardsValidator
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.storage.VolumeStorage
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension::class)
class JenkinsJobWidgetTest : WidgetTestBase() {

    private lateinit var underTest: JenkinsJobWidget

    override fun widgetName() = "JenkinsJobWidget"

    @BeforeEach
    fun initForTest() {
        super.init()
        underTest = JenkinsJobWidget(vertx, initWidget(), initService())
    }

    @Test
    fun `Expect success widget update message send on event bus`() {

        underTest.handleResponse(successResponse)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertUpdateDatePresent(result)
        assertStatus("OK", result)
        assertDisplayName("#5", content)
        assertBranch("master-branch", content)
        assertDuration(10800030L, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/5/", content)
        assertTimestamp(1574080795968L, content)
    }

    @Test
    fun `Expect fail widget update message send on event bus`() {

        underTest.handleResponse(failResponse)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertUpdateDatePresent(result)
        assertStatus("FAIL", result)
        assertDisplayName("#7", content)
        assertBranch("master-branch", content)
        assertDuration(9L, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/7/", content)
        assertTimestamp(1572536545536L, content)
    }

    @Test
    fun `Expect in-progress widget update message send on event bus`() {

        underTest.handleResponse(inProgressResponse)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertUpdateDatePresent(result)
        assertStatus("IN_PROGRESS", result)
        assertDisplayName("#6", content)
        assertBranch("master-branch", content)
        assertDuration(0, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/6/", content)
        assertTimestamp(1574165093771L, content)
    }

    private fun assertDuration(expected: Long, result: JsonObject) {
        Assertions.assertEquals(expected, result.getLong("duration"))
    }

    private fun assertDisplayName(expected: String, result: JsonObject) {
        Assertions.assertEquals(expected, result.getString("displayName"))
    }

    private fun assertBranch(expected: String, result: JsonObject) {
        Assertions.assertEquals(expected, result.getString("branch"))
    }

    private fun assertTimestamp(expected: Long, result: JsonObject) {
        Assertions.assertEquals(expected, result.getLong("timestamp"))
    }
}
