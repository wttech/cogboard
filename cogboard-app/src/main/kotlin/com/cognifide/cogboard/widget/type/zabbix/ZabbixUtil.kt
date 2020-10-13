package com.cognifide.cogboard.widget.type.zabbix

import kotlin.math.pow
import kotlin.math.roundToLong

fun Long.convertToPercentage(maxValueInBytes: Int): Long {
    val valueInGigabytes = maxValueInBytes.bytesToGigabytes()
    return div(valueInGigabytes)
            .times(100)
            .roundToLong()
}

private fun Int.bytesToGigabytes(): Double {
    return this * 10.0.pow(9)
}
