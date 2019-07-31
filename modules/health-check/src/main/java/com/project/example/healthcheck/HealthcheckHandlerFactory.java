package com.project.example.healthcheck;

import io.knotx.server.api.handler.RoutingHandlerFactory;
import io.vertx.core.Handler;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.healthchecks.Status;
import io.vertx.reactivex.core.Vertx;
import io.vertx.reactivex.ext.healthchecks.HealthCheckHandler;
import io.vertx.reactivex.ext.healthchecks.HealthChecks;
import io.vertx.reactivex.ext.web.RoutingContext;
import io.vertx.reactivex.ext.web.client.WebClient;

public class HealthcheckHandlerFactory implements RoutingHandlerFactory {

  @Override
  public String getName() {
    return "healthcheck";
  }

  @Override
  public Handler<RoutingContext> create(Vertx vertx, JsonObject config) {
    HealthChecks checks = HealthChecks.create(vertx);
    checks.register("API check", 200, future -> {
      WebClient webClient = WebClient.create(vertx);
      webClient.get(8092, "localhost", "/api/v1/example")
          .rxSend()
          .subscribe(onSuccess -> {
            JsonObject jsonResponse = onSuccess.bodyAsJsonObject();
            future.complete("success".equals(jsonResponse.getString("status")) ? Status.OK() :
                Status.KO());
          }, onError -> future
              .complete(Status.KO(new JsonObject().put("error", onError.getMessage()))));
    });
    checks.register("API check", 200, future -> {
      WebClient webClient = WebClient.create(vertx);
      webClient.get(8092, "localhost", "/api/v2/example")
          .rxSend()
          .subscribe(onSuccess -> {
            JsonObject jsonResponse = onSuccess.bodyAsJsonObject();
            future.complete("success".equals(jsonResponse.getString("status")) ? Status.OK() :
                Status.KO());
          }, onError -> future
              .complete(Status.KO(new JsonObject().put("error", onError.getMessage()))));
    });
    return HealthCheckHandler.createWithHealthChecks(checks);
  }
}
