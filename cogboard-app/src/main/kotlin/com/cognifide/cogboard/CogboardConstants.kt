package com.cognifide.cogboard

import io.vertx.core.json.JsonObject

class CogboardConstants {
    companion object {
        const val DEFAULT_WEB_SOCKET_PORT = 9001
        val DEFAULT_VALUES: JsonObject = JsonObject().put(Props.SCHEDULE_PERIOD, Props.SCHEDULE_PERIOD_DEFAULT)
        fun errorResponse(message: String = ""): JsonObject = JsonObject().put("status", "failed $message")
    }

    class StatusCode {
        companion object {
            const val a401 = 401
            const val a200 = 200
        }
    }

    class Props {
        companion object {
            const val ID = "id"
            const val EVENT_TYPE = "eventType"
            const val BOARDS = "boards"
            const val BOARDS_BY_ID = "boardsById"
            const val BOARDS_ALL = "allBoards"
            const val WIDGETS = "widgets"
            const val WIDGETS_BY_ID = "widgetsById"
            const val AVAILABLE_WIDGETS = "widgetTypes"
            const val STATUS = "status"
            const val WIDGET_STATUS = "widgetStatus"
            const val ERROR_MESSAGE = "errorMessage"
            const val ERROR_CAUSE = "errorCause"
            const val DISABLED = "disabled"
            const val HEADERS = "headers"
            const val CONTENT = "content"
            const val WIDGET_TYPE = "type"
            const val AUTHENTICATION_TYPES = "authenticationTypes"
            const val SCHEDULE_PERIOD = "schedulePeriod"
            const val SCHEDULE_PERIOD_DEFAULT = 120L // 120 seconds
            const val SCHEDULE_DELAY_DEFAULT = 10L // 10 seconds
            const val URL = "url"
            const val REQUEST_ID = "requestId"
            const val PUBLIC_URL = "publicUrl"
            const val USER = "user"
            const val USERNAME = "username"
            const val PASSWORD = "password"
            const val CURRENT_PASSWORD = "currentPassword"
            const val NEW_PASSWORD = "newPassword"
            const val TOKEN = "token"
            const val BODY = "body"
            const val EVENT_ADDRESS = "event.address"
            const val ENDPOINT = "endpoint"
            const val ENDPOINTS = "endpoints"
            const val ENDPOINT_LOADED = "endpoint.loaded"
            const val CREDENTIAL = "credential"
            const val CREDENTIALS = "credentials"
            const val LAST_UPDATED = "lastUpdated"
            const val ARRAY = "array"
            const val STATUS_CODE = "statusCode"
            const val STATUS_MESSAGE = "statusMessage"
            const val EXPECTED_STATUS_CODE = "expectedStatusCode"
            const val REQUEST_METHOD = "requestMethod"
            const val EXPECTED_RESPONSE_BODY = "expectedResponseBody"
            const val CONTENT_TYPE = "contentType"
            const val PATH = "path"
            const val LABEL = "label"
            const val BOARD_COLUMN_MAX = 20
            const val BOARD_COLUMN_MIN = 4
            const val NAME = "name"
            const val DISPLAY = "display"
            const val VALUE = "value"
            const val RELEASE_NAME = "releaseName"
            const val JQL_QUERY = "jqlQuery"
            const val BUCKET_QUERIES = "bucketQueries"
            const val BUCKET_NAME = "bucketName"
            const val PULL_REQUESTS = "pullRequests"
        }
    }

    class RequestMethod {
        companion object {
            const val GET = "get"
            const val POST = "post"
            const val PUT = "put"
            const val DELETE = "delete"
        }
    }

    class Event {
        companion object {
            const val SEND_MESSAGE_TO_WEBSOCKET = "cogboard.websocket.message"
            const val VERSION_CONFIG = "cogboard.config.handler.version"
            const val BOARDS_CONFIG = "cogboard.config.boards"
            const val UPDATE_WIDGET_CONTENT_CONFIG = "cogboard.config.widget.contentUpdate"
            const val UPDATE_WIDGET_CONFIG = "cogboard.config.widget.update"
            const val REFRESH_WIDGET_CONFIG = "cogboard.config.widget.refresh"
            const val DELETE_WIDGET_CONFIG = "cogboard.config.widget.delete"
            const val PURGE_WIDGET_CONFIG = "cogboard.config.widget.purge"
            const val ENDPOINTS = "cogboard.config.endpoints"
            const val UPDATE_ENDPOINTS = "cogboard.config.endpoints.update"
            const val CREDENTIALS = "cogboard.config.credentials"
            const val UPDATE_CREDENTIALS = "cogboard.config.credentials.update"
            const val USER_CONTROL = "cogboard.config.user.control"
            const val HTTP_GET = "cogboard.httpclient.get"
            const val HTTP_CHECK = "cogboard.httpclient.check"
            const val HTTP_POST = "cogboard.httpclient.post"
            const val HTTP_PUT = "cogboard.httpclient.put"
            const val HTTP_DELETE = "cogboard.httpclient.delete"
        }
    }

    class EventType {
        companion object {
            const val WIDGET_UPDATE = "widget-update"
            const val CONFIG_SAVED = "config-saved"
            const val NEW_VERSION = "new-version"
        }
    }
}
