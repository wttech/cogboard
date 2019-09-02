#### Configuration:
* `Endpoint` - choose Jenkins endpoint*
* `Schedule Period` - time interval between executions | recommended: `300000` (5min)
* `Path` - path to the job | example: `/job/ProjectName/job/build-name`


`*` example Jenkins Endpoint props:
```js
  {
    id: "endpoint1",
    label: "Jenkins Endpoint",
    url: "http://internal.url or http://ip.address",
    publicUrl: "https://external.url",
    user: "user.name",
    password: "pass"
  }
```