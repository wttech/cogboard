package com.cognifide.cogboard.utils

import com.cognifide.cogboard.CogboardConstants.Props
import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import io.vertx.ext.auth.KeyStoreOptions
import io.vertx.ext.auth.jwt.JWTAuthOptions
import io.vertx.reactivex.core.http.HttpServerResponse
import java.util.stream.Collectors

object ExtensionFunctions {

    fun JsonArray.findById(idValue: String, idKey: String = Props.ID): JsonObject {
        return this.findByKeyValue(idValue, idKey)
    }

    fun String.asJsonObject(propName: String): JsonObject = JsonObject().put(propName, this)

    fun HttpServerResponse.endEmptyJson() {
        this.end(JsonObject().toString())
    }

    fun KeyStoreOptions.toJWT(): JWTAuthOptions = JWTAuthOptions().setKeyStore(this)

    private fun JsonArray.findByKeyValue(value: String, key: String): JsonObject {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(key) == value }
                .findFirst()
                .orElse(JsonObject())
    }

    fun JsonArray.findAllByKeyValue(value: String, key: String): List<JsonObject> {
        return this.stream()
                .map { it as JsonObject }
                .filter { it.getString(key) == value }
                .collect(Collectors.toList())
    }

    fun JsonArray.getObjectPositionById(idValue: String, idKey: String = Props.ID): Int {
        var index = 0
        while (index < this.size()) {
            val credential = this.getJsonObject(index)
            if (credential.getString(idKey) == idValue) {
                break
            }
            index++
        }
        return index
    }

    fun JsonObject.putIfNotExist(key: String, value: Any): JsonObject {
        if (!this.containsKey(key)) {
            this.put(key, value)
        }
        return this
    }

    fun String.makeUrlPublic(publicDomain: String): String {
        if (this == "") return ""
        if (publicDomain == "") return this

        val rest = this.substringAfter("//").substringAfter("/")
        return "${publicDomain.removeSuffix("/")}/$rest"
    }

    fun JsonObject.endpointProp(key: String) =
            this.getJsonObject(Props.ENDPOINT_LOADED).getString(key, "")
}
