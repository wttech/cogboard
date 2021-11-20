package com.cognifide.cogboard.widget.type.logviewer.logparser

import main.kotlin.com.cognifide.cogboard.logStorage.Log
import main.kotlin.com.cognifide.cogboard.logStorage.LogVariableData
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

class MockLogParser : LogParser {
    override val variableFields = listOf("Provider", "Message")

    private val regex = """^(?<$DATE>[0-9-:]+) \*(?<$TYPE>[A-Z]+)\* \[(?<$PROVIDER>[a-zA-Z]+)\][ ]+(?<$MESSAGE>.+)$"""
            .toRegex()

    override fun parseLine(line: String): Log? {
        val groups = regex.matchEntire(line.trim())?.groups ?: return null

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
            return null
        }
    }

    companion object {
        private val dateTimeFormatter = DateTimeFormatter.ofPattern("u-M-d:H:m:s")
        private const val DATE = "date"
        private const val TYPE = "type"
        private const val PROVIDER = "provider"
        private const val MESSAGE = "message"
    }
}
