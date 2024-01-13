package com.cognifide.cogboard.widget.type.logviewer.logparser

import com.cognifide.cogboard.logStorage.model.Log

interface LogParserStrategy {
    val variableFields: List<String>
    fun parseLine(line: String): Log
}
