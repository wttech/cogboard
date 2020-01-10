package com.cognifide.cogboard.widget.type.persondraw

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.time.LocalDateTime
import java.time.ZoneOffset

class PersonDrawWidget(vertx: Vertx, config: JsonObject, boardService: BoardsConfigService = BoardsConfigService()) :
        BaseWidget(vertx, config, boardService) {

    private val interval: Long = config.getLong(PROP_INTERVAL, SELECT_INTERVAL)
    private val randomize: Boolean = config.getBoolean(PROP_RANDOMIZE, false)
    private val values: List<String> = config.getJsonArray(PROP_VALUES, JsonArray()).filterIsInstance<String>()
    private val isDaily: Boolean = config.getBoolean(PROP_IS_DAILY, false)

    init {
        super.config.put(CogboardConstants.PROP_SCHEDULE_PERIOD, SYNC_INTERVAL)
        createDynamicChangeSubscriber()?.handler{ userEventCycle() }
    }

    override fun updateState() {
        timeoutCycle()
    }

    private fun timeoutCycle() {
        cycle(forceCycle = false)
    }

    private fun userEventCycle() {
        cycle(forceCycle = true)
    }

    private fun cycle(forceCycle: Boolean = false) {
        val widgetObject = ContentRepository().get(id)
        val currentIndex = widgetObject.getInteger(PROP_CONTENT_INDEX, -1)
        val updateDateMillis = widgetObject
                .getLong(PROP_CONTENT_UPDATE_DATE, LocalDateTime.now().toInstant(ZoneOffset.UTC).toEpochMilli())
        val usedIndexes = widgetObject
                .getJsonArray(PROP_CONTENT_USED_INDEXES, JsonArray()).filterIsInstance<Int>()

        // Handle user changes between interval or daily cycle events
        var updateDate = fromEpochMillis(updateDateMillis)
        if (!isDaily && updateDate.isAfter(LocalDateTime.now().plusMinutes(interval))) {
            updateDate = LocalDateTime.now()
        }

        // Handle text items values change
        val valuesContentHash = widgetObject.getInteger(PROP_CONTENT_VALUE_HASH, -1)
        val valuesChanged = values.toTypedArray().contentHashCode() != valuesContentHash

        if (shouldCycle(forceCycle, currentIndex, updateDate, valuesChanged)) {
            val nextIndex = calculateNextIndex(randomize, currentIndex, values, usedIndexes)
            val nextUpdateDate = calculateNextUpdateDate(isDaily, interval)
            val usedIndexesContent = updateUsedIndexes(usedIndexes, values, nextIndex)
            sendUpdate(nextIndex, nextUpdateDate, usedIndexesContent, values.toTypedArray().contentHashCode())
        }
    }

    private fun sendUpdate(nextIndex: Int, updateDate: LocalDateTime, usedIndexes: List<Int>, valuesContentHash: Int) {
        val content = JsonObject().apply {
            put(PROP_CONTENT_INDEX, nextIndex)
            put(PROP_CONTENT_USED_INDEXES, usedIndexes)
            put(PROP_CONTENT_UPDATE_DATE, updateDate.toInstant(ZoneOffset.UTC).toEpochMilli())
            put(PROP_CONTENT_VALUE_HASH, valuesContentHash)
            put(PROP_VALUES, config.getValue(PROP_VALUES))
        }
        send(JsonObject().put(CogboardConstants.PROP_CONTENT, content))
    }

    private fun updateUsedIndexes(usedIndexes: List<Int>, values: List<String>, nextIndex: Int) =
            if (usedIndexes.size <= values.size - 1) usedIndexes.plus(nextIndex) else listOf(nextIndex)

    private fun shouldCycle(forceCycle: Boolean, currentIndex: Int, updateDate: LocalDateTime, valuesChanged: Boolean) =
            valuesChanged || forceCycle || currentIndex < 0 || LocalDateTime.now().isAfter(updateDate)

    private fun calculateNextIndex(randomize: Boolean, curIndex: Int, values: List<String>, usedIndexes: List<Int>) =
            if (randomize) values.getRandomListIndex(usedIndexes) else values.getNextListIndex(curIndex)

    companion object {
        const val SELECT_INTERVAL = 120L
        const val SYNC_INTERVAL = 60L
        const val PROP_IS_DAILY = "personDrawDailySwitch"
        const val PROP_VALUES = "multiTextInput"
        const val PROP_RANDOMIZE = "randomizeCheckbox"
        const val PROP_INTERVAL = "personDrawInterval"
        const val PROP_CONTENT_INDEX = "index"
        const val PROP_CONTENT_USED_INDEXES = "usedIndexes"
        const val PROP_CONTENT_UPDATE_DATE = "updateDate"
        const val PROP_CONTENT_VALUE_HASH = "valueHash"
    }
}
