package com.project.example.handler;

import io.knotx.server.api.handler.RoutingHandlerFactory;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.reactivex.core.Vertx;
import io.vertx.reactivex.ext.web.RoutingContext;

public class ExampleAPIHandler implements RoutingHandlerFactory {

  private static final JsonObject DEFAULT_NO_BODY = new JsonObject().put("status", "failed");

  @Override
  public String getName() {
    return "example-api";
  }

  @Override
  public Handler<RoutingContext> create(Vertx vertx, JsonObject config) {
    return event -> {
      event.response().end(config.getJsonObject("body", DEFAULT_NO_BODY).encode());
    };
  }
}
