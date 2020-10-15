package com.cognifide.cogboard.widget.type.zabbix

import com.cognifide.cogboard.widget.Widget
import io.vertx.core.json.JsonArray
import kotlin.math.pow
import kotlin.math.roundToLong

fun Long.convertToPercentage(maxValueInGigabytes: Int): Long {
    val valueInBytes = maxValueInGigabytes.gigabytesToBytes()
    return div(valueInBytes)
            .times(100)
            .roundToLong()
}

private fun Int.gigabytesToBytes(): Double {
    return this * 10.0.pow(9)
}

fun status(lastValue: Long, range: JsonArray): Widget.Status {
    val unstableRange = (range.list[0] as Int) until (range.list[1] as Int)
    return when {
        lastValue < unstableRange.first -> return Widget.Status.OK
        lastValue in unstableRange -> return Widget.Status.UNSTABLE
        lastValue >= unstableRange.last -> return Widget.Status.FAIL
        else -> Widget.Status.NONE
    }
}
