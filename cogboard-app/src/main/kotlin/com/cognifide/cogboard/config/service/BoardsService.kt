package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

internal class BoardsService(private val config: JsonObject, private val vertx: Vertx) {

    private val widgets = mutableMapOf<String, Widget>()

    fun createOrUpdate(config: JsonObject) {
        var newConfig = config
        val id = config.getString(com.cognifide.cogboard.CogboardConstants.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(config, true)
            }
            newConfig.attachEndpoint()
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | There is widget with no ID in configuration: $config")
        }
    }

    fun delete(config: JsonObject) {
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets.remove(id)?.stop()
            LOGGER.info("Widget Deleted: $config")
        } else {
            LOGGER.error("Widget Delete | There is widget with no ID in configuration: $config")
        }
    }

    private fun JsonObject.attachEndpoint() {
        val endpointId = this.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = EndpointLoader.from(config, endpointId).loadWithSensitiveData()
            this.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(BoardsService::class.java)
    }
}