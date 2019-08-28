package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.LoggerFactory
import java.util.*

class ExampleWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    init {
        // You can override default props if you want
        super.config.put(CogboardConstants.PROP_SCHEDULE_PERIOD, schedulePeriod)
    }

    override fun start(): Widget {
        super.start()
        LOGGER.info("Widget started: id $id | period $schedulePeriod")
        return this
    }

    override fun stop(): Widget {
        super.stop()
        LOGGER.info("Widget stopped: id $id")
        return this
    }

    override fun updateState() {
        send(JsonObject()
                .put(CogboardConstants.PROP_STATUS, Widget.Status.random())
                .put(CogboardConstants.PROP_CONTENT, JsonObject().put("serverTime", Date().time)))
    }

    companion object {
        private val LOGGER = LoggerFactory.getLogger(ExampleWidget::class.java)
    }

}