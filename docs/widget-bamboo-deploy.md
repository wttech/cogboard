# [Home](/cogboard/) >> Bamboo Deployment widget

#### Configuration:

- `Endpoint` - choose configured Bamboo endpoint
- `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
- `ID` - choose deployment which you would like to show

#### Where to find `ID` ?

1. Go to `<bamboo_host>/deploy/viewAllDeploymentProjects.action`
2. Click on deployment from list
3. Project page opens:

   - In URL you will find `ID` number >> <bamboo_host>/deploy/viewEnvironment.action?id=1234567

###### Tested on Bamboo v.6.1.1
