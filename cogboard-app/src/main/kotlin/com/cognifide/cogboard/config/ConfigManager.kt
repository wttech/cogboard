package com.cognifide.cogboard.config

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.Storage
import com.cognifide.cogboard.storage.docker.VolumeStorage
import com.cognifide.cogboard.widget.Widget
import com.cognifide.cogboard.widget.WidgetIndex
import io.vertx.core.AbstractVerticle
import io.vertx.core.json.JsonObject
import io.vertx.core.logging.Logger
import io.vertx.core.logging.LoggerFactory

class ConfigManager : AbstractVerticle() {

    private val widgets = mutableMapOf<String, Widget>()
    private lateinit var storage: Storage

    override fun start() {
        storage = VolumeStorage(vertx)
        listenOnConfigSave()
        listenOnWidgetUpdate()
        listenOnWidgetDelete()
        listenOnEndpointsUpdate()
        loadConfig()
    }

    private fun listenOnConfigSave() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_CONFIG_SAVE)
            .handler { storage.saveConfig(it.body()) }

    private fun listenOnWidgetUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_WIDGET_CONFIG)
            .handler { createOrUpdate(it.body()) }

    private fun listenOnWidgetDelete() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_DELETE_WIDGET_CONFIG)
            .handler { delete(it.body()) }

    private fun listenOnEndpointsUpdate() = vertx
            .eventBus()
            .consumer<JsonObject>(CogboardConstants.EVENT_UPDATE_ENDPOINTS_CONFIG)
            .handler {
                updateEndpointsConfig(it.body())
                storage.saveEndpointsConfig(config())
            }

    private fun loadConfig() = storage
            .loadConfig()
            .getJsonObject(CogboardConstants.PROP_WIDGETS)
            .getJsonObject(CogboardConstants.PROP_WIDGETS_BY_ID)
            .forEach {
                createOrUpdate(JsonObject(it.value.toString()))
            }

    private fun createOrUpdate(config: JsonObject) {
        var newConfig = config
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets[id]?.let {
                it.stop()
                newConfig = it.config().mergeIn(config, true)
            }
            attachEndpoint(newConfig)
            widgets[id] = WidgetIndex.create(newConfig, vertx).start()
        } else {
            LOGGER.error("Widget Update / Create | There is widget with no ID in configuration: $config")
        }
    }

    private fun delete(config: JsonObject) {
        val id = config.getString(CogboardConstants.PROP_ID)

        if (id != null) {
            widgets.remove(id)?.stop()
        } else {
            LOGGER.error("Widget Delete | There is widget with no ID in configuration: $config")
        }
    }

    private fun attachEndpoint(config: JsonObject) {
        val endpointId = config.getString(CogboardConstants.PROP_ENDPOINT)
        endpointId?.let {
            val endpoint = Endpoint.from(config(), endpointId)
            config.put(CogboardConstants.PROP_ENDPOINT, endpoint.asJson(true))
        }
    }

    private fun updateEndpointsConfig(endpoint: JsonObject) {
        val endpointId = endpoint.getString(CogboardConstants.PROP_ID)
        if (Endpoint.exists(config(), endpointId)) {
            Endpoint.from(config(), endpointId)
                    .asJson(false)
                    .mergeIn(endpoint, true)
        } else {
            config().getJsonArray("endpoints").add(endpoint)
        }
    }

    companion object {
        val LOGGER: Logger = LoggerFactory.getLogger(ConfigManager::class.java)
    }
}