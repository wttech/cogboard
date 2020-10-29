package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class IframeEmbedWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {

    override fun updateState() {
        updateStateByCopingPropsToContent(PROPS)
    }

    companion object {
        val PROPS = setOf("iframeUrl")
    }
}
