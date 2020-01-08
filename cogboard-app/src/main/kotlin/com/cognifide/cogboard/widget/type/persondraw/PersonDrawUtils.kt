package com.cognifide.cogboard.widget.type.persondraw

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import kotlin.random.Random

fun <T> List<T>.getNextListIndex(currentIndex: Int): Int {

    if (this.isEmpty()) {
        return -1
    }

    val nextIndex = if (currentIndex >= 0) currentIndex + 1 else 0

    return if (this.isNotEmpty() && nextIndex < this.size) nextIndex else 0
}

fun <T> List<T>.getRandomListIndex(usedIndexes: List<Int>): Int {

    if (this.isEmpty()) {
        return -1
    }

    val indexes = this.mapIndexed { index, _ -> index }
            .filter { i -> !usedIndexes.contains(i) }

    // If there is one index, there is no need to use random function
    if (indexes.size == 1) {
        return indexes[0]
    }

    return if (indexes.isNotEmpty()) {
        indexes[Random.nextInt(0, indexes.size)]
    } else {
        Random.nextInt(0, this.size)
    }
}

fun fromEpochMillis(millis: Long): LocalDateTime {
    val ofEpochMilli = Instant.ofEpochMilli(millis)
    return ofEpochMilli.atZone(ZoneId.systemDefault()).toLocalDateTime()
}

fun calculateNextUpdateDate(isDaily: Boolean, interval: Long): LocalDateTime = if (isDaily) {
    LocalDateTime.now().apply {
        plusDays(1)
        withHour(0)
        withMinute(1)
    }
} else {
    LocalDateTime.now().plusMinutes(interval)
}
