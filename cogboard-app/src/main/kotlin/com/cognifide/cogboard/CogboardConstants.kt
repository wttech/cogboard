package com.cognifide.cogboard

import io.vertx.core.json.JsonObject

class CogboardConstants {
    companion object {

        const val DEFAULT_WEB_SOCKET_PORT = 9001
        const val STATUS_CODE_401 = 401
        const val STATUS_CODE_200 = 200
        const val PROP_ID = "id"
        const val PROP_EVENT_TYPE = "eventType"
        const val PROP_BOARDS = "boards"
        const val PROP_BOARDS_BY_ID = "boardsById"
        const val PROP_BOARDS_ALL = "allBoards"
        const val PROP_WIDGETS = "widgets"
        const val PROP_WIDGETS_BY_ID = "widgetsById"
        const val PROP_STATUS = "status"
        const val PROP_WIDGET_STATUS = "widgetStatus"
        const val PROP_ERROR_MESSAGE = "errorMessage"
        const val PROP_ERROR_CAUSE = "errorCause"
        const val PROP_DISABLED = "disabled"
        const val PROP_HEADERS = "headers"
        const val PROP_CONTENT = "content"
        const val PROP_WIDGET_TYPE = "type"
        const val PROP_SCHEDULE_PERIOD = "schedulePeriod"
        const val PROP_SCHEDULE_PERIOD_DEFAULT = 120L // 120 seconds
        const val PROP_SCHEDULE_DELAY_DEFAULT = 10L // 10 seconds
        const val PROP_URL = "url"
        const val PROP_REQUEST_ID = "requestId"
        const val PROP_PUBLIC_URL = "publicUrl"
        const val PROP_USER = "user"
        const val PROP_USERNAME = "username"
        const val PROP_PASSWORD = "password"
        const val PROP_CURRENT_PASSWORD = "currentPassword"
        const val PROP_NEW_PASSWORD = "newPassword"
        const val PROP_TOKEN = "token"
        const val PROP_BODY = "body"
        const val PROP_EVENT_ADDRESS = "event.address"
        const val PROP_ENDPOINT = "endpoint"
        const val PROP_ENDPOINTS = "endpoints"
        const val PROP_ENDPOINT_LOADED = "endpoint.loaded"
        const val PROP_CREDENTIAL = "credential"
        const val PROP_CREDENTIALS = "credentials"
        const val PROP_LAST_UPDATED = "lastUpdated"
        const val PROP_ARRAY = "array"
        const val PROP_STATUS_CODE = "statusCode"
        const val PROP_STATUS_MESSAGE = "statusMessage"
        const val PROP_EXPECTED_STATUS_CODE = "expectedStatusCode"
        const val PROP_REQUEST_METHOD = "requestMethod"
        const val PROP_EXPECTED_RESPONSE_BODY = "expectedResponseBody"
        const val PROP_PATH = "path"
        const val PROP_LABEL = "label"
        const val PROP_BOARD_COLUMN_MAX = 20
        const val PROP_BOARD_COLUMN_MIN = 4
        const val PROP_NAME = "name"
        const val PROP_RELEASE_NAME = "releaseName"
        const val PROP_JQL_QUERY = "jqlQuery"
        const val PROP_BUCKET_QUERIES = "bucketQueries"
        const val PROP_BUCKET_NAME = "bucketName"

        const val EVENT_SEND_MESSAGE_TO_WEBSOCKET = "cogboard.websocket.message"
        const val EVENT_VERSION_CONFIG = "cogboard.config.handler.version"
        const val EVENT_BOARDS_CONFIG = "cogboard.config.boards"
        const val EVENT_UPDATE_WIDGET_CONTENT_CONFIG = "cogboard.config.widget.contentUpdate"
        const val EVENT_UPDATE_WIDGET_CONFIG = "cogboard.config.widget.update"
        const val EVENT_REFRESH_WIDGET_CONFIG = "cogboard.config.widget.refresh"
        const val EVENT_DELETE_WIDGET_CONFIG = "cogboard.config.widget.delete"
        const val EVENT_PURGE_WIDGET_CONFIG = "cogboard.config.widget.purge"
        const val EVENT_ENDPOINTS = "cogboard.config.endpoints"
        const val EVENT_UPDATE_ENDPOINTS = "cogboard.config.endpoints.update"
        const val EVENT_CREDENTIALS = "cogboard.config.credentials"
        const val EVENT_UPDATE_CREDENTIALS = "cogboard.config.credentials.update"
        const val EVENT_USER_CONTROL = "cogboard.config.user.control"
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

        fun errorResponse(message: String = ""): JsonObject = JsonObject().put("status", "failed $message")
    }
}
