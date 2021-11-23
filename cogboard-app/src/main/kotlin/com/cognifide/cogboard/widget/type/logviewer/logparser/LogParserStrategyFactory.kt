package com.cognifide.cogboard.widget.type.logviewer.logparser

class LogParserStrategyFactory {
    enum class Type {
        MOCK
    }

    fun build(type: Type): LogParserStrategy {
        return when (type) {
            Type.MOCK -> MockLogParserStrategy()
            else -> throw UnknownParserTypeException("Unknown log parsing type")
        }
    }
}

class UnknownParserTypeException(message: String) : RuntimeException(message)
