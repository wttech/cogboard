# SonarQube widget

#### Configuration:
* `Endpoint` - choose Jenkins endpoint*
* `Schedule Period` - time interval between executions >>> recommended: `300000` (5min)
* `Key` - project key >>> example: `com.cognifide.zg:com.cognifide.zg:stable`
* `ID` - dashboard id >>> example: `68496`
* `Metrics` - choose metrics which you would like to show

#### Where to find `Key` and `Index` ?
1. Go to `<sonarqube_host>/dashboard/index`
2. Click on project from list
3. Project page opens:  
   * In URL you will find `ID` number >>> <sonarqube_host>/overview?id=`316488`  
   * On a page (upper-right corner) you will find `Key`

`*` example SonarQube Endpoint props:
```js
  {
    id: "endpoint2",
    label: "SonarQube Endpoint",
    url: "http://internal.url or http://ip.address",
    publicUrl: "https://external.url",
    user: "user.name",
    password: "pass"
  }
```