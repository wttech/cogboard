package com.cognifide.cogboard.widget

import io.vertx.core.json.JsonObject

interface Widget {

    val id: String
    val type: String

    fun start(): Widget

    fun stop(): Widget

    fun updateState()

    fun send(state: JsonObject)

    fun config(): JsonObject

    enum class Status {
        UNKNOWN,
        OK,
        FAIL,
        UNSTABLE,
        IN_PROGRESS,
        ERROR,
        ERROR_CONNECTION;

        companion object {
            fun from(text: String): Status = when (text.toUpperCase()) {
                "SUCCESS" -> OK
                "FAILURE" -> FAIL
                else -> values().firstOrNull { it.name.equals(text, ignoreCase = true) } ?: UNKNOWN
            }
            fun from(number: Int): Status = when (number) {
                in 0..299 -> OK
                in 300..399 -> UNSTABLE
                else -> ERROR
            }
        }
    }
}