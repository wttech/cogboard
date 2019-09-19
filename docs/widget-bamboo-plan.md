# [Home](/cogboard/) >> Bamboo Plan widget

#### Configuration:
* `Endpoint` - choose AEM endpoint*
* `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
* `ID` - choose health checks which you would like to show

#### Where to find `ID` ?
1. Go to `<bamboo_host>/allPlans.action`
2. Click on plan from list
3. Project page opens:  
   * In URL you will find `ID` number >> <bamboo_host>/browse/`CSOI-SDFAPTAS`  

`*` example Bamboo Plan Endpoint props:
```js
  {
    id: "endpoint2",
    label: "Bamboo Endpoint",
    url: "http://internal.url or http://ip.address",
    publicUrl: "https://external.url",
    user: "user.name",
    password: "pass"
  }
```