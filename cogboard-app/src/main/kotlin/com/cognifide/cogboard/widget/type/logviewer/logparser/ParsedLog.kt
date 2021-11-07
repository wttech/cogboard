package com.cognifide.cogboard.widget.type.logviewer.logparser

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class ParsedLog(values: Map<String, String>) {
    companion object {
        const val DATE = "date"
        const val TYPE = "type"
        const val PROVIDER = "Provider"
        const val MESSAGE = "Message"
        const val TEMPLATE = "template"
        const val HEADERS = "headers"
        const val VARIABLE_DATA = "variableData"
        const val DESCRIPTION = "description"
        const val ADDITIONAL_DATA = "additionalData"
        const val ID = "ID"
        const val IP_ADDRESS = "IP address"
        const val PORT = "Port"
    }

    private val _parsedLogJson = JsonObject()
    private val variableData = JsonObject()

    val parsedLogJson: JsonObject
        get() {
            _parsedLogJson.put(VARIABLE_DATA, variableData)
            return _parsedLogJson
        }

    init {
        values[TYPE]?.let { _parsedLogJson.put(TYPE, it) }
        values[DATE]?.let { _parsedLogJson.put(DATE, it) }
        values[PROVIDER]?.let { addFieldToVariableData(PROVIDER, it) }
        values[MESSAGE]?.let { addFieldToVariableData(MESSAGE, it) }
        addAdditionalData()
    }

    private fun addFieldToVariableData(template: String, value: String) {
        val templateArray = variableData.getJsonArray(TEMPLATE, JsonArray())
        val headersArray = variableData.getJsonArray(HEADERS, JsonArray())
        val descriptionArray = variableData.getJsonArray(DESCRIPTION, JsonArray())

        if (!templateArray.contains(template)) {
            templateArray.add(template)
            headersArray.add(value)
            descriptionArray.add("No description")
        }
        variableData.put(TEMPLATE, templateArray)
        variableData.put(HEADERS, headersArray)
        variableData.put(DESCRIPTION, descriptionArray)
    }

    private fun addAdditionalData() {
        val additionalData = JsonObject()
        additionalData.put(ID, "None")
        additionalData.put(TYPE.capitalize(), "None")
        additionalData.put(IP_ADDRESS, "None")
        additionalData.put(PORT, "None")

        _parsedLogJson.put(ADDITIONAL_DATA, additionalData)
    }
}
