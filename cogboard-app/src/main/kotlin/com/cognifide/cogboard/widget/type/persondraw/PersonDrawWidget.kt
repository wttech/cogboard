package com.cognifide.cogboard.widget.type.persondraw

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import com.cognifide.cogboard.widget.type.persondraw.PersonDrawDateUtil.Companion.calculateNextUpdateDate
import com.cognifide.cogboard.widget.type.persondraw.PersonDrawDateUtil.Companion.parseLocalDateTime
import com.cognifide.cogboard.widget.type.persondraw.PersonDrawIndexer.Companion.getNextListIndex
import com.cognifide.cogboard.widget.type.persondraw.PersonDrawIndexer.Companion.getRandomListIndex
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.time.LocalDateTime
import java.time.ZoneOffset

class PersonDrawWidget(vertx: Vertx, config: JsonObject, boardService: BoardsConfigService = BoardsConfigService()) :
        BaseWidget(vertx, config, boardService) {

    private var valuesArch: List<String> = listOf()
    private var updateDate: LocalDateTime = LocalDateTime.now()
    private var currentIndex: Int = -1
    private var usedIndexes: List<Int> = listOf()

    init {
        super.config.put(CogboardConstants.PROP_SCHEDULE_PERIOD, SYNC_INTERVAL)
        val widgetObject = ContentRepository().get(id)
        currentIndex = widgetObject.getInteger(PROP_CONTENT_INDEX, -1)
        val updateDateMillis = widgetObject.getLong(PROP_CONTENT_UPDATE_DATE, -1)
        if (updateDateMillis > 0) {
            updateDate = parseLocalDateTime(updateDateMillis)
        }

        createDynamicChangeSubscriber()
                .handler { cycle(forceCycle = true) }
    }

    override fun updateState() {
        cycle()
    }

    // Todo: check if is possible to operate only on content fields
    private fun cycle(forceCycle: Boolean = false) {
        val isDaily = config.getBoolean(PROP_IS_DAILY, false)
        val values = toStringList(config.getJsonArray(PROP_VALUES, JsonArray()))
        val randomize = config.getBoolean(PROP_RANDOMIZE, false)
        val interval = config.getLong(PROP_INTERVAL, SELECT_INTERVAL)

        // Handle user changes between interval or daily cycle events
        if (!isDaily && updateDate.isAfter(LocalDateTime.now().plusMinutes(interval))) {
            updateDate = LocalDateTime.now()
        }

        if (forceCycle || shouldCycle(currentIndex, updateDate) || values != valuesArch) {
            currentIndex = calculateIndex(randomize, values)
            updateDate = calculateNextUpdateDate(isDaily, interval)
            sendUpdate(currentIndex, updateDate)
        }
    }

    private fun calculateIndex(randomize: Boolean, values: List<String>): Int {
        val index = newIndex(randomize, currentIndex, values, usedIndexes)

        if (index >= 0) {
            usedIndexes = usedIndexes.plus(index)
        }

        if (usedIndexes.size == values.size) {
            usedIndexes = emptyList()
        }

        return index
    }

    private fun toStringList(values: JsonArray) = values.filterIsInstance<String>()

    private fun shouldCycle(currentIndex: Int, updateDate: LocalDateTime) =
            currentIndex < 0 || LocalDateTime.now().isAfter(updateDate)

    private fun sendUpdate(nextIndex: Int, updateDate: LocalDateTime) {
        val content = JsonObject().apply {
            put(PROP_CONTENT_INDEX, nextIndex)
            put(PROP_CONTENT_UPDATE_DATE, updateDate.toInstant(ZoneOffset.UTC).toEpochMilli())
            put(PROP_VALUES, config.getValue(PROP_VALUES))
        }
        send(JsonObject().put(CogboardConstants.PROP_CONTENT, content))
    }

    private fun newIndex(randomize: Boolean, currentIndex: Int, values: List<String>, usedIndexes: List<Int>) =
            if (randomize) getRandomListIndex(values, usedIndexes) else getNextListIndex(currentIndex, values)

    companion object {
        const val SELECT_INTERVAL = 120L
        const val SYNC_INTERVAL = 60L
        const val PROP_IS_DAILY = "personDrawDailySwitch"
        const val PROP_VALUES = "multiTextInput"
        const val PROP_RANDOMIZE = "randomizeCheckbox"
        const val PROP_INTERVAL = "personDrawInterval"
        const val PROP_CONTENT_INDEX = "index"
        const val PROP_CONTENT_UPDATE_DATE = "updateDate"
    }
}
