package com.cognifide.cogboard.widget.type.logviewer.logparser

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

abstract class LogParserStrategy {
    fun parseLines(logLines: Collection<String>): JsonArray {
        val resultArray = JsonArray()
        for (line in logLines) {
            val parsedLine = parseLine(line)
            resultArray.add(parsedLine)
        }
        return resultArray
    }

    abstract fun parseLine(logLine: String): JsonObject
}
