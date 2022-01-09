package com.cognifide.cogboard.widget.type.logviewer.logparser

import org.junit.jupiter.api.Test
import java.lang.AssertionError

class DefaultLogParserStrategyTest {
    private val sampleLog = "2021-11-06:22:40:25 *DEBUG* [FelixStartLevel]  Integer lobortis. bibendum Nulla mi"
    private val parser = DefaultLogParserStrategy()

    @Test
    fun parseSampleLog() {
        assert(parser.variableFields == listOf("Provider", "Message"))

        val output = parser.parseLine(sampleLog)

        assert(output.type == "DEBUG")
        assert(output.date == 1636238425L)
        assert(output.variableData.size == 2)
        assert(output.variableData[0].header == "FelixStartLevel")
        assert(output.variableData[1].header == "Integer lobortis. bibendum Nulla mi")
    }
}