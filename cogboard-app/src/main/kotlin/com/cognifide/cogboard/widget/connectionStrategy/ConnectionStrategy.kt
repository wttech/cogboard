package com.cognifide.cogboard.widget.connectionStrategy

abstract class ConnectionStrategy {
    abstract fun connectAndGetResources(address: String, vararg arguments: String)
}
