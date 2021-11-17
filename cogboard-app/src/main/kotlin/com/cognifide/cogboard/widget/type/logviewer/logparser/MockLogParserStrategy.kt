package com.cognifide.cogboard.widget.type.logviewer.logparser

import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.TYPE
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.DATE
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.PROVIDER
import com.cognifide.cogboard.widget.type.logviewer.logparser.ParsedLog.Companion.MESSAGE

class MockLogParserStrategy : LogParserStrategy() {
    private val regex = """^(?<$DATE>[0-9-:]+) \*(?<$TYPE>[A-Z]+)\* \[(?<$PROVIDER>[a-zA-Z]+)\][ ]+(?<$MESSAGE>.+)$"""
            .trimMargin()
            .toRegex()

    override fun parseLine(logLine: String): JsonObject {
        val groups = regex.matchEntire(logLine.trim())?.groups

        return createLogObject(groups)
    }

    private fun createLogObject(groups: MatchGroupCollection?): JsonObject {
        val mapOfCapturedValues = mutableMapOf<String, String>()
        mapOfCapturedValues[TYPE] = groups?.get(TYPE)?.value ?: ""
        mapOfCapturedValues[DATE] = groups?.get(DATE)?.value ?: ""
        mapOfCapturedValues[PROVIDER] = groups?.get(PROVIDER)?.value ?: ""
        mapOfCapturedValues[MESSAGE] = groups?.get(MESSAGE)?.value ?: ""

        val parsedLog = ParsedLog(mapOfCapturedValues)
        return parsedLog.parsedLogJson
    }
}
