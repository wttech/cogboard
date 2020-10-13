package com.cognifide.cogboard.widget.type.zabbix

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
