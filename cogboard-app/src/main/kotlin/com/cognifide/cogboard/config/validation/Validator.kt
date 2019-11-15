package com.cognifide.cogboard.config.validation

import io.vertx.core.json.JsonObject

interface Validator {

    fun validate(config: JsonObject): Boolean
}
