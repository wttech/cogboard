package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

class ToDoListWidget(vertx: Vertx, config: JsonObject) : BaseWidget(vertx, config) {

    init {
        createDynamicChangeSubscriber()?.handler {
            val state = changeSelectedItems(it.body())
            send(state)
        }
    }

    override fun updateState() {
        send(contentJson())
    }

    private fun changeSelectedItems(state: JsonObject): JsonObject {
        val widget = ContentRepository().get(id)
        val selectedItem = state.getValue(SELECTED_ITEM)
        val selectedItems = widget.getJsonArray(SELECTED_ITEMS)
        when {
            selectedItems.contains(selectedItem) -> {
                selectedItems.remove(selectedItem)
            }
            else -> {
                selectedItems.add(selectedItem)
            }
        }
        return contentJson(selectedItems)
    }

    private fun contentJson(selectedItems: JsonArray = JsonArray()) =
            JsonObject().put(CogboardConstants.PROP_CONTENT, JsonObject().put(SELECTED_ITEMS, selectedItems))

    companion object {
        val PROPS = setOf("toDoListItems", "isScrollable")
        const val SELECTED_ITEM = "selectedItem"
        const val SELECTED_ITEMS = "selectedItems"
    }
}
