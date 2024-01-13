package com.cognifide.cogboard.widget.type.logviewer.logparser

class LogParserStrategyFactory {
    enum class Type {
        DEFAULT
    }

    fun build(typeStr: String): LogParserStrategy {
        return try {
            when (Type.valueOf(typeStr.toUpperCase())) {
                Type.DEFAULT -> DefaultLogParserStrategy()
            }
        } catch (e: IllegalArgumentException) {
            throw UnknownParserTypeException("Unknown log parsing type")
        }
    }
}

class UnknownParserTypeException(message: String) : RuntimeException(message)
