package com.cognifide.cogboard.widget.type.logviewer.logparser

import main.kotlin.com.cognifide.cogboard.logStorage.Log

interface LogParser {
    fun parseLine(line: String): Log?

    fun parseLines(lines: Collection<String>): List<Log> {
        return lines.mapNotNull { parseLine(it) }
    }
}