package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.widget.AsyncWidget
import com.cognifide.cogboard.widget.Widget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import com.cognifide.cogboard.CogboardConstants as CC

class AemBundleInfoWidget(vertx: Vertx, config: JsonObject) : AsyncWidget(vertx, config) {

    private val resolvedThreshold = config.getInteger(PROP_RESOLVED_THRESHOLD, 2)
    private val installedThreshold = config.getInteger(PROP_INSTALLED_THRESHOLD, 2)

    private val exclusions: List<String> =
        config
            .getString(PROP_EXCLUDED_BUNDLES, "")
            .split("\n")
            .filter(String::isNotBlank)
            .distinct()

    override fun handleResponse(responseBody: JsonObject) {
        if (checkAuthorized(responseBody)) {
            if (!responseBody.containsKey(PROP_STATUSES_ARRAY)) {
                sendUnknownResponseError()
                return
            }

            val numericStatus = responseBody.getStatusMap()

            val bundles = responseBody.getJsonArray("data").list
            val (excludedBundles, inactiveBundles) = getFilteredBundles(bundles)

            updateNumericStatusForExcluded(excludedBundles, numericStatus)

            val content = createWidgetContent(numericStatus, excludedBundles, inactiveBundles)

            sendSuccess(content)
        }
    }

    private fun getFilteredBundles(bundles: List<Any?>): Pair<List<JsonObject>, List<JsonObject>> {
        return bundles
            .mapNotNull { it as JsonObject }
            .partition { exclusions.contains(it.getString("symbolicName")) }
            .let { pair ->
                Pair(
                    pair.first,
                    pair.second.filter { inactiveBundleStatuses.contains(it.getString("state")) }
                )
            }
    }

    private fun createWidgetContent(
        numericStatus: MutableMap<String, Int>,
        excludedBundles: List<JsonObject>,
        inactiveBundles: List<JsonObject>
    ): JsonObject =
        JsonObject()
            .put(PROP_BUNDLE_STATUS, numericStatus)
            .put(PROP_EXCLUDED_BUNDLES, excludedBundles)
            .put(PROP_INACTIVE_BUNDLES, inactiveBundles)
            .put(CC.PROP_WIDGET_STATUS, statusByNumbers(numericStatus))

    private fun statusByNumbers(numericStatus: MutableMap<String, Int>): Widget.Status {
        val resolved = numericStatus[PROP_BUNDLE_STATUS_RESOLVED] ?: 0
        val installed = numericStatus[PROP_BUNDLE_STATUS_INSTALLED] ?: 0

        if (resolved > 0) {
            return if (resolved < resolvedThreshold) Widget.Status.UNSTABLE else Widget.Status.ERROR
        }
        if (installed > 0) {
            return if (installed < installedThreshold) Widget.Status.UNSTABLE else Widget.Status.ERROR
        }

        return Widget.Status.OK
    }

    private fun updateNumericStatusForExcluded(
        excludedBundles: List<JsonObject>,
        numericStatus: MutableMap<String, Int>
    ) {
        excludedBundles.forEach {
            val key = it.getString("state").toLowerCase()
            numericStatus[key] = numericStatus[key]!! - 1
        }
    }

    private fun sendSuccess(content: JsonObject) {
        content.put(CC.PROP_ERROR_MESSAGE, "")

        send(JsonObject().put(CC.PROP_CONTENT, content))
    }

    override fun updateState() {
        if (url.isNotBlank()) {
            httpGet("$url/system/console/bundles.json")
        } else {
            sendConfigurationError("Endpoint URL is blank")
        }
    }

    private fun JsonObject.getStatusMap(): MutableMap<String, Int> {
        return this
            .getJsonArray(PROP_STATUSES_ARRAY, JsonArray())
            .mapIndexed { idx, value ->
                statusMappingList[idx] to value as Int
            }
            .toMap()
            .toMutableMap()
    }

    companion object {
        val statusMappingList = listOf("total", "active", "fragmented", "resolved", "installed")
        val inactiveBundleStatuses = listOf("Resolved", "Installed")

        const val PROP_BUNDLE_STATUS = "bundleStatus"
        const val PROP_INACTIVE_BUNDLES = "inactiveBundles"
        const val PROP_BUNDLE_STATUS_RESOLVED = "resolved"
        const val PROP_BUNDLE_STATUS_INSTALLED = "installed"
        const val PROP_STATUSES_ARRAY = "s"
        const val PROP_EXCLUDED_BUNDLES = "excludedBundles"
        const val PROP_RESOLVED_THRESHOLD = "resolvedThreshold"
        const val PROP_INSTALLED_THRESHOLD = "installedThreshold"
    }
}
