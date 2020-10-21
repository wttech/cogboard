package com.cognifide.cogboard.widget.type.randompicker

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import kotlin.random.Random

fun <T> List<T>.getNextListIndex(currentIndex: Int): Int = when {
    this.isEmpty() -> -1
    currentIndex in 0..(size - 2) -> currentIndex + 1
    else -> 0
}

fun <T> List<T>.getRandomListIndex(usedIndexes: List<Int>): Int {
    return if (this.isEmpty()) {
        -1
    } else {
        val indexes = this.mapIndexed { index, _ -> index }
                .filter { i -> !usedIndexes.contains(i) }
        when {
            // If there is one index, there is no need to use random function
            indexes.size == 1 -> return indexes[0]
            indexes.isNotEmpty() -> indexes[Random.nextInt(0, indexes.size)]
            else -> Random.nextInt(0, this.size)
        }
    }
}

fun fromEpochMillis(millis: Long): LocalDateTime {
    val ofEpochMilli = Instant.ofEpochMilli(millis)
    return ofEpochMilli.atZone(ZoneId.systemDefault()).toLocalDateTime()
}

fun calculateNextUpdateDate(isDaily: Boolean, interval: Long): LocalDateTime = if (isDaily) {
    LocalDateTime.now()
            .plusDays(1)
            .withHour(0)
            .withMinute(1)
} else {
    LocalDateTime.now().plusMinutes(interval)
}
