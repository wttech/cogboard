package com.cognifide.cogboard.config.service

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.EndpointLoader
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory
import java.util.stream.Collectors

class WidgetRuntimeService(
    private val vertx: Vertx,
    private val contentRepository: ContentRepository
) {
    private val widgets = mutableMapOf<String, Widget>()

    fun init(widgetsById: JsonObject): WidgetRuntimeService {
        widgetsById.fieldNames()
                .map { widgetsById.getJsonObject(it) }
                .forEach { createOrUpdateWidget(it) }
        return this
    }

    fun destroyWidget(action: String, widgetConfig: JsonObject) {
        stopAndRemove(action, widgetConfig)?.let {
            contentRepository.delete(it)
        }
    }

    fun createOrUpdateWidget(widgetConfig: JsonObject) {
        val id = widgetConfig.getId()

        if (id != null) {
            widgets[id]?.stop()

            widgetConfig.attachEndpoint()
            widgets[id] = WidgetIndex.create(widgetConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | " +
                    "There is no widget with given ID in configuration: $widgetConfig")
        }
    }

    fun reloadWidgetsWithChangedEndpoints(endpoints: JsonArray) {
        val endpointIds = endpoints.stream().map { it as JsonObject }
                .map { it.getValue(CogboardConstants.PROP_ID) }
                .collect(Collectors.toList())
        widgets.forEach { (_, widget) ->
            if (widget.config().getValue(CogboardConstants.PROP_ENDPOINT) != null) {
                val widgetEndpointId = fetchWidgetEndpointId(widget)
                if (widgetEndpointId in endpointIds) {
                    val widgetId = widget.config().getValue(CogboardConstants.PROP_ID).toString()
                    widgets[widgetId]?.stop()
                    widget.config().attachEndpoint(CogboardConstants.PROP_ID)
                    widgets[widgetId] = WidgetIndex.create(widget.config(), vertx).start()
                }
            }
        }
    }

    private fun fetchWidgetEndpointId(widget: Widget): String {
        val endpoint: JsonObject = widget.config().getValue("endpoint") as JsonObject
        return endpoint.getValue("id").toString()
    }

    fun handleWidgetContentUpdate(widgetConfig: JsonObject) {
        widgetContentUpdateAddress(widgetConfig)?.let { widgetAddress ->
            vertx
                    .eventBus()
                    .publish(widgetAddress, widgetConfig)
        }
    }

    private fun widgetContentUpdateAddress(widgetConfig: JsonObject): String? =
            widgetConfig.getId()
                    ?.takeIf { widgets.containsKey(it) }
                    ?.let { createWidgetContentUpdateAddress(it) }

    private fun stopAndRemove(action: String, widgetConfig: JsonObject): String? {
        val id = widgetConfig.getId()
        if (id != null) {
            widgets.remove(id)?.stop()
            LOGGER.info("Widget $action: $widgetConfig")
        } else {
            LOGGER.error("Widget $action | " +
                    "There is no widget with given ID in configuration: $widgetConfig")
        }
        return id
    }

    private fun JsonObject.getId(): String? =
            this.getString(CogboardConstants.PROP_ID)

    private fun JsonObject.attachEndpoint() {
        val endpointId = this.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = EndpointLoader().loadWithSensitiveData(endpointId)
            this.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    private fun JsonObject.attachEndpoint(endpointValue: String) {
        val endpointId = (this.getValue(CogboardConstants.PROP_ENDPOINT) as JsonObject).getValue(CogboardConstants.PROP_ID).toString()
        endpointId.let {
            val endpoint = EndpointLoader().loadWithSensitiveData(endpointId)
            this.put(CogboardConstants.PROP_ENDPOINT, endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(WidgetRuntimeService::class.java)

        internal fun createWidgetContentUpdateAddress(id: String) =
                CogboardConstants.EVENT_UPDATE_WIDGET_CONTENT_CONFIG + '.' + id
    }
}
