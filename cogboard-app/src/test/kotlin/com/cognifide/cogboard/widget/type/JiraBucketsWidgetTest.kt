package com.cognifide.cogboard.widget.type

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.BeforeEach
import java.util.*

class JiraBucketsWidgetTest : WidgetTestBase() {
    private lateinit var underTest: JiraBucketsWidget

    override fun widgetName(): String = underTest.javaClass.simpleName

    override fun initWidget(): JsonObject {
        val bucketQueries = JsonArray()
        bucketQueries.add(JsonObject()
                .put("id", UUID.randomUUID())
                .put("bucketName", "New")
                .put("jqlQuery", "project%20%3D%20RND%20AND%20status%20%3D%20New"))
        return super.initWidget()
                .put("bucketQueries", bucketQueries)
    }
    @BeforeEach
    fun initForTest() {
        super.init()

        underTest = JiraBucketsWidget(vertx, initWidget())
    }

//    @Test
//    fun `Expect two issues in response`() {
//
//    }

    private fun sendResponseWithCapture(response: JsonObject): Pair<JsonObject, JsonObject> {
        underTest.handleResponse(response)
        return captureWhatIsSent(eventBus, captor)
    }
}