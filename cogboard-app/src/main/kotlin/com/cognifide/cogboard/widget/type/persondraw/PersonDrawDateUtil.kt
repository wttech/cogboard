package com.cognifide.cogboard.widget.type.persondraw

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

class PersonDrawDateUtil {
    companion object {
        fun parseLocalDateTime(millis: Long): LocalDateTime {
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
    }
}
