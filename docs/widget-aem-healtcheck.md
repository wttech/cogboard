# [Home](/cogboard/) >> AEM Healthcheck widget

#### Configuration:
* `Endpoint` - choose AEM endpoint*
* `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
* `Health Checks` - choose health checks which you would like to show

`*` example AEM Healthcheck Endpoint props:
```js
  {
    id: "endpoint2",
    label: "AEM Stage Endpoint",
    url: "http://internal.url or http://ip.address",
    publicUrl: "https://external.url",
    user: "user.name",
    password: "pass"
  }
```