package com.cognifide.cogboard.widget.type

import com.cognifide.cogboard.config.service.BoardsConfigService
import com.cognifide.cogboard.widget.BaseWidget
import io.vertx.core.Vertx
import io.vertx.core.json.JsonObject

class CheckboxWidget(
    vertx: Vertx,
    config: JsonObject,
    serv: BoardsConfigService
) : BaseWidget(vertx, config, serv) {

    init {
        createDynamicChangeSubscriber()?.handler { send(it.body(), true) }
    }

    override fun updateState() {
        // noop, everything is handled in content
    }
}
