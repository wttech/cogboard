package com.cognifide.cogboard.widget.type.logviewer.logparser

import main.kotlin.com.cognifide.cogboard.logStorage.Log

interface LogParserStrategy {
    val variableFields: List<String>
    fun parseLine(line: String): Log?
}
