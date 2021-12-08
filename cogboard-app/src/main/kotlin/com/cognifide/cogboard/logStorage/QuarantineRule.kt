package main.kotlin.com.cognifide.cogboard.logStorage

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject

data class QuarantineRule(
    val label: String,
    val reasonField: String,
    val regex: Regex,
    val enabled: Boolean
) {
    companion object {
        private const val LABEL = "label"
        private const val REASON = "reasonField"
        private const val REGEX = "regExp"
        private const val ENABLED = "checked"

        fun from(json: JsonObject): QuarantineRule? {
            return try {
                QuarantineRule(
                        json.getString(LABEL)!!,
                        json.getString(REASON)!!,
                        json.getString(REGEX)!!.toRegex(),
                        json.getBoolean(ENABLED)!!
                )
            } catch (_: NullPointerException) {
                null
            }
        }

        fun from(array: JsonArray): List<QuarantineRule> =
                array
                        .mapNotNull { it }
                        .mapNotNull { it as? JsonObject }
                        .mapNotNull { from(it) }
    }
}
