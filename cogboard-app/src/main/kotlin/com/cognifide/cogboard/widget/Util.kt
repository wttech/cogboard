package com.cognifide.cogboard.widget

fun String.makeUrlPublic(publicDomain: String): String {
    if (this == "") return ""
    if (publicDomain == "") return this

    val rest = this.substringAfter("//").substringAfter("/")
    return "${publicDomain.removeSuffix("/")}/$rest"
}
