package com.cognifide.cogboard.widget.type.logviewer.logparser

import com.cognifide.cogboard.logStorage.model.Log
import com.cognifide.cogboard.logStorage.model.LogVariableData
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

class MockLogParserStrategy : LogParserStrategy {
    override val variableFields = listOf("Provider", "Message")

    private val regex = """^(?<$DATE>[0-9-:]+) \*(?<$TYPE>[A-Z]+)\* \[(?<$PROVIDER>[a-zA-Z]+)\][ ]+(?<$MESSAGE>.+)$"""
            .toRegex()

    override fun parseLine(line: String): Log {
        val groups = regex.matchEntire(line.trim())?.groups ?: return makeParsingErrorLog(line)

        try {
            val date = LocalDateTime
                .parse(groups[DATE]!!.value, dateTimeFormatter)
                .toEpochSecond(ZoneOffset.UTC)
            val type = groups[TYPE]!!.value
            val provider = groups[PROVIDER]!!.value
            val message = groups[MESSAGE]!!.value

            val variableData = listOf(
                    LogVariableData(provider, "No description"),
                    LogVariableData(message, "No message description")
            )

            return Log(date = date, type = type, variableData = variableData)
        } catch (_: NullPointerException) {
            return makeParsingErrorLog(line)
        }
    }

    companion object {
        private val dateTimeFormatter = DateTimeFormatter.ofPattern("u-M-d:H:m:s")
        private const val DATE = "date"
        private const val TYPE = "type"
        private const val PROVIDER = "provider"
        private const val MESSAGE = "message"

        private fun makeParsingErrorLog(line: String): Log = Log(
                date = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC),
                type = "ERROR",
                variableData = listOf(
                        LogVariableData("MockLogParserStrategy", "No description"),
                        LogVariableData("Cannot parse a log", "Line causing the error: $line")
                )
        )
    }
}
