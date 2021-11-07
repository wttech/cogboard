package com.cognifide.cogboard.widget.type.logviewer.logparser

class LogParserStrategyFactory {
    companion object {
        const val MOCK = "mock"
    }

    fun build(type: String): LogParserStrategy {
        return when (type) {
            MOCK -> MockLogParserStrategy()
            else -> throw UnknownParserTypeException("Unknown strategy type")
        }
    }
}

class UnknownParserTypeException(message: String) : RuntimeException(message)
