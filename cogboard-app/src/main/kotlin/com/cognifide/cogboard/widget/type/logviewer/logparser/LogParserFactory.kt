package com.cognifide.cogboard.widget.type.logviewer.logparser

class LogParserFactory {
    enum class Type {
        MOCK
    }

    fun build(type: Type): LogParser {
        return when (type) {
            Type.MOCK -> MockLogParser()
            else -> throw UnknownParserTypeException("Unknown log parsing type")
        }
    }
}

class UnknownParserTypeException(message: String) : RuntimeException(message)
