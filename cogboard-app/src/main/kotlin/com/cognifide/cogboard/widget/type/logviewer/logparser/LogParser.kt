package com.cognifide.cogboard.widget.type.logviewer.logparser

import main.kotlin.com.cognifide.cogboard.logStorage.Log

interface LogParser {
    val variableFields: List<String>
    fun parseLine(line: String): Log?
}
