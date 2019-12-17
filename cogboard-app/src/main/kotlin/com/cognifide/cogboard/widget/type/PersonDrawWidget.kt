package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.CogboardConstants
import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.storage.ContentRepository
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZoneOffset
import kotlin.random.Random

class PersonDrawWidget(vertx: Vertx, config: JsonObject, boardService: BoardsConfigService = BoardsConfigService()) :
    BaseWidget(vertx, config, boardService) {

    private val valuesArch: MutableList<String> = mutableListOf()
    private var updateDate: LocalDateTime = LocalDateTime.now()
    private var currentIndex: Int = -1
    private var usedIndexes: MutableList<Int> = mutableListOf()

    init {
        super.config.put(CogboardConstants.PROP_SCHEDULE_PERIOD, SYNC_INTERVAL)
        if (currentIndex == -1) {
            currentIndex = ContentRepository().get(id).getInteger(PROP_CONTENT_INDEX, -1)
            val updateDateMillis = ContentRepository().get(id).getLong(PROP_CONTENT_UPDATE_DATE, -1)
            if (updateDateMillis > 0) {
                val ofEpochMilli = Instant.ofEpochMilli(updateDateMillis)
                updateDate = ofEpochMilli.atZone(ZoneId.systemDefault()).toLocalDateTime()
            }
        }

        createDynamicChangeSubscriber()
                .handler { cycle(forceCycle = true) }
    }

    override fun updateState() {
        cycle()
    }

    private fun cycle(forceCycle: Boolean = false) {
        val isDaily = config.getBoolean(PROP_IS_DAILY, false)
        val values = toStringList(config.getJsonArray(PROP_VALUES, JsonArray()))
        val randomize = config.getBoolean(PROP_RANDOMIZE, false)
        val interval = config.getLong(PROP_INTERVAL, SELECT_INTERVAL)

        if (!isDaily && updateDate.isAfter(LocalDateTime.now().plusMinutes(interval))) {
            updateDate = LocalDateTime.now()
        }

        if (forceCycle || shouldCycle(currentIndex, updateDate) || values != valuesArch) {
            syncValues(values)
            currentIndex = newIndex(randomize, currentIndex, values, usedIndexes)
            updateDate = calculateNextUpdateDate(isDaily, interval)
            sendUpdate(currentIndex, updateDate)
        }
    }

    private fun syncValues(values: MutableList<String>) {
        valuesArch.clear()
        valuesArch.addAll(values)
    }

    private fun toStringList(values: JsonArray): MutableList<String> {
        val list = mutableListOf<String>()
        for (i in 0 until values.size()) list.add(values.getString(i))
        return list
    }

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

    private fun calculateNextUpdateDate(isDaily: Boolean, interval: Long): LocalDateTime = if (isDaily) {
        LocalDateTime.now().apply {
            plusDays(1)
            withHour(0)
            withMinute(1)
        }
    } else {
        LocalDateTime.now().plusMinutes(interval)
    }

    private fun newIndex(randomize: Boolean, currentIndex: Int, values: List<String>, usedIndexes: MutableList<Int>) =
            if (randomize) getRandomIndex(currentIndex, values, usedIndexes) else getNextIndex(currentIndex, values)

    private fun getNextIndex(currentIndex: Int, values: List<String>): Int {
        val nextIndex = currentIndex + 1
        return if (values.isNotEmpty() && nextIndex < values.size) nextIndex else 0
    }

    private fun getRandomIndex(currentIndex: Int, values: List<String>, usedIndexes: MutableList<Int>): Int {
        usedIndexes.add(currentIndex)
        val indexes = values.mapIndexed { index, _ -> index }.filter { i -> !usedIndexes.contains(i) }

        return if (indexes.isNotEmpty()) indexes[(getRandomNumber(indexes.size))] else getRandomNumber(values.size)
    }

    private fun getRandomNumber(size: Int): Int = Random.nextInt(0, size)

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
