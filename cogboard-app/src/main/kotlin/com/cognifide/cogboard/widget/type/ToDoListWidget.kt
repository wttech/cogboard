package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class ToDoListWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {

    init {
        createDynamicChangeSubscriber()?.handler {
            val state = changeSelectedItems(it.body())
            send(JsonObject().put(SELECTED_ITEMS, state))
        }
    }

    override fun updateState() {
        val selectedItems = loadSelectedItems()
        send(JsonObject().put(SELECTED_ITEMS, selectedItems))
    }

    private fun changeSelectedItems(state: JsonObject): JsonArray {
        val selectedItems: JsonArray
        if (state.containsKey(CLEAR_ITEMS) && state.getBoolean(CLEAR_ITEMS)) {
            selectedItems = JsonArray()
        } else {
            selectedItems = loadSelectedItems()
            addOrRemoveItem(state, selectedItems)
        }
        return selectedItems
    }

    private fun addOrRemoveItem(state: JsonObject, selectedItems: JsonArray) {
        val selectedItem = state.getValue(SELECTED_ITEM)
        if (selectedItems.contains(selectedItem)) {
            selectedItems.remove(selectedItem)
        } else {
            selectedItems.add(selectedItem)
        }
    }

    private fun loadSelectedItems(): JsonArray {
        val widget = ContentRepository().get(id)
        return widget.getJsonArray(SELECTED_ITEMS) ?: JsonArray()
    }

    companion object {
        val PROPS = setOf("toDoListItems")
        const val SELECTED_ITEM = "selectedItem"
        const val SELECTED_ITEMS = "selectedItems"
        const val CLEAR_ITEMS = "clearItems"
    }
}
