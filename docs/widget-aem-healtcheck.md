# [Home](/cogboard/) >> AEM Healthcheck widget

#### Configuration:
* `Endpoint` - choose AEM endpoint*
* `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
* `Health Checks` - choose health checks which you would like to show**

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

`**` There are other health checks available in AEM. If other checks are desirable they can be added easily by contributing to: 
`cogboard-webapp/src/constants/index.js#AEM_HEALTH_CHECKS` constant.