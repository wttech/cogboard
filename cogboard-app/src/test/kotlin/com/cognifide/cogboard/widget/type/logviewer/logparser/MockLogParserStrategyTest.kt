package com.cognifide.cogboard.widget.type.logviewer.logparser

import org.junit.jupiter.api.Test
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.TYPE
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.DATE
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.VARIABLE_DATA
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.HEADERS
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.TEMPLATE
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.PROVIDER
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.MESSAGE

class MockLogParserStrategyTest {
    private val sampleLog = "2021-11-06:22:40:25 *DEBUG* [FelixStartLevel]  Integer lobortis. bibendum Nulla mi"
    private val parser = MockLogParserStrategy()

    @Test
    fun parseSampleLog() {
        val output = parser.parseLine(sampleLog)
        val variableData = output.getJsonObject(VARIABLE_DATA)
        val template = variableData.getJsonArray(TEMPLATE)
        val headers = variableData.getJsonArray(HEADERS)

        assert(output.getString(TYPE) == "DEBUG")
        assert(output.getString(DATE) == "2021-11-06:22:40:25")
        assert(template.getString(0) == PROVIDER)
        assert(template.getString(1) == MESSAGE)
        assert(headers.getString(0) == "FelixStartLevel")
        assert(headers.getString(1) == "Integer lobortis. bibendum Nulla mi")
    }
}