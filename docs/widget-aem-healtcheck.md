# [Home](/cogboard/) >> AEM Healthcheck widget

#### Configuration:

- `Endpoint` - choose AEM endpoint
- `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
- `Health Checks` - choose health checks which you would like to show\*

`*` There are other health checks available in AEM. If other checks are desirable they can be added easily by contributing to:
`cogboard-webapp/src/constants/index.js#AEM_HEALTH_CHECKS` constant.

###### Tested on AEM v.6.5
