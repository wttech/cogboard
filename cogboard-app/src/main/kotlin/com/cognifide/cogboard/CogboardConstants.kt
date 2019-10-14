package com.cognifide.cogboard

import io.vertx.core.json.JsonObject

class CogboardConstants {
    companion object {

        const val PROP_ID = "id"
        const val PROP_EVENT_TYPE = "eventType"
        const val PROP_WIDGETS = "widgets"
        const val PROP_WIDGETS_BY_ID = "widgetsById"
        const val PROP_STATUS = "status"
        const val PROP_ERROR_MESSAGE = "errorMessage"
        const val PROP_DISABLED = "disabled"
        const val PROP_TITLE = "title"
        const val PROP_CONTENT = "content"
        const val PROP_WIDGET_TYPE = "type"
        const val PROP_SCHEDULE_PERIOD = "schedulePeriod"
        const val PROP_SCHEDULE_PERIOD_DEFAULT = 120L // 120 seconds
        const val PROP_SCHEDULE_DELAY_DEFAULT = 0L
        const val PROP_URL = "url"
        const val PROP_USER = "user"
        const val PROP_PASSWORD = "password"
        const val PROP_BODY = "body"
        const val PROP_EVENT_ADDRESS = "event.address"
        const val PROP_ENDPOINT = "endpoint"
        const val PROP_ARRAY = "array"
        const val PROP_STATUS_CODE = "statusCode"
        const val PROP_STATUS_MESSAGE = "statusMessage"
        const val PROP_EXPECTED_STATUS_CODE = "expectedStatusCode"
        const val PROP_REQUEST_METHOD = "requestMethod"
        const val PROP_PATH = "path"

        const val EVENT_SEND_MESSAGE_TO_WEBSOCKET = "cogboard.websocket.message"
        const val EVENT_SAVE_BOARDS_CONFIG = "cogboard.config.boards.save"
        const val EVENT_UPDATE_WIDGET_CONFIG = "cogboard.config.widget.update"
        const val EVENT_DELETE_WIDGET_CONFIG = "cogboard.config.widget.delete"
        const val EVENT_UPDATE_ENDPOINTS_CONFIG = "cogboard.config.endpoints.update"
        const val EVENT_DELETE_ENDPOINTS_CONFIG = "cogboard.config.endpoints.delete"
        const val EVENT_HTTP_GET = "cogboard.httpclient.get"
        const val EVENT_HTTP_CHECK = "cogboard.httpclient.check"
        const val EVENT_HTTP_POST = "cogboard.httpclient.post"
        const val EVENT_HTTP_PUT = "cogboard.httpclient.put"
        const val EVENT_HTTP_DELETE = "cogboard.httpclient.delete"
        const val REQUEST_METHOD_GET = "get"
        const val REQUEST_METHOD_POST = "post"
        const val REQUEST_METHOD_PUT = "put"
        const val REQUEST_METHOD_DELETE = "delete"

        val DEFAULT_VALUES: JsonObject = JsonObject()
                .put(PROP_SCHEDULE_PERIOD, PROP_SCHEDULE_PERIOD_DEFAULT)

        fun errorResponse(message : String = "") : JsonObject = JsonObject().put("status", "failed $message")
    }
}