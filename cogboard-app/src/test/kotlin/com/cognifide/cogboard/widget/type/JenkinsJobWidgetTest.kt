package com.cognifide.cogboard.widget.type

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ExtendWith(MockitoExtension::class)
class JenkinsJobWidgetTest : WidgetTestCommon() {

    private lateinit var underTest: JenkinsJobWidget

    override fun widgetName() = "JenkinsJobWidget"

    @BeforeEach
    fun initForTest() {
        super.init()

        underTest = JenkinsJobWidget(vertx, initWidget())
    }

    @Test
    @DisplayName("Expect success widget update message send on event bus")
    fun successResponceGenerateValidUpdateEvent() {

        underTest.handleResponse(successResponce)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertStatus("OK", result)
        assertDisplayName("#5", content)
        assertBranch("master-branch", content)
        assertDuration(10800030L, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/5/", content)
        assertTimestamp(1574080795968L, content)
    }

    @Test
    @DisplayName("Expect fail widget update message send on event bus")
    fun failResponceGenerateValidUpdateEvent() {

        underTest.handleResponse(failResponce)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertStatus("FAIL", result)
        assertDisplayName("#7", content)
        assertBranch("master-branch", content)
        assertDuration(9L, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/7/", content)
        assertTimestamp(1572536545536L, content)
    }

    @Test
    @DisplayName("Expect in-progress widget update message send on event bus")
    fun inProgressResponceGenerateValidUpdateEvent() {

        underTest.handleResponse(inProgressResponce)

        val (result, content) = captureWhatIsSent(eventBus, captor)

        assertStatus("IN_PROGRESS", result)
        assertDisplayName("#6", content)
        assertBranch("master-branch", content)
        assertDuration(0, content)
        assertURL("http://jenkins.org/job/project_name/job/job_name/6/", content)
        assertTimestamp(1574165093771L, content)
    }
}