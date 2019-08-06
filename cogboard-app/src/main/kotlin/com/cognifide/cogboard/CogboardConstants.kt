package com.cognifide.cogboard

import io.vertx.core.json.JsonObject

class CogboardConstants {
    companion object {
        private const val FIVE_MINUTES_IN_MILIS = 300000L

        const val PROP_ID = "id"
        const val PROP_WIDGETS = "widgets"
        const val PROP_WIDGETS_BY_ID = "widgetsById"
        const val PROP_STATUS = "status"
        const val PROP_DISABLED = "disabled"
        const val PROP_TITLE = "title"
        const val PROP_CONTENT = "content"
        const val PROP_WIDGET_TYPE = "type"
        const val PROP_SCHEDULE_PERIOD = "schedulePeriod"
        const val PROP_SCHEDULE_PERIOD_DEFAULT = FIVE_MINUTES_IN_MILIS
        const val PROP_SCHEDULE_DELAY = "scheduleDelay"
        const val PROP_SCHEDULE_DELAY_DEFAULT = 0L
        const val PROP_URL = "url"
        const val PROP_USER = "user"
        const val PROP_PASSWORD = "password"
        const val PROP_BODY = "body"
        const val PROP_EVENT_ADDRESS = "event.address"
        const val PROP_ENDPOINT = "endpoint"
        const val PROP_ARRAY = "array"

        const val EVENT_SEND_MESSAGE_TO_WEBSOCKET = "cogboard.websocket.message"
        const val EVENT_UPDATE_WIDGET_CONFIG = "cogboard.config.widget.update"
        const val EVENT_CONFIG_SAVE = "cogboard.config.save"
        const val EVENT_SEND_GET = "cogboard.httpclient.get"
        const val EVENT_SEND_POST = "cogboard.httpclient.post"

        val DEFAULT_VALUES: JsonObject = JsonObject()
                .put(PROP_SCHEDULE_PERIOD, PROP_SCHEDULE_PERIOD_DEFAULT)
                .put(PROP_SCHEDULE_DELAY, PROP_SCHEDULE_DELAY_DEFAULT)

        fun errorResponse(message : String = "") : JsonObject = JsonObject().put("status", "failed $message")
    }
}