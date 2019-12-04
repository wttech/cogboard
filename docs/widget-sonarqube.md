# [Home](/cogboard/) >> SonarQube widget

#### Configuration:

- `Endpoint` - choose SonarQube endpoint
- `Schedule Period` - time interval between executions >> recommended: `300000` (5min)
- `Key` - project key >> example: `com.company.project-name:com.company.project-name:stable`
- `ID` - dashboard id >> example: `12345`
- `Metrics` - choose metrics which you would like to show

#### Where to find `Key` and `ID` ?

1. Go to `<sonarqube_host>/dashboard/index`
2. Click on project from list
3. Project page opens:

   - In URL you will find `ID` number >> <sonarqube_host>/overview?id=123456
   - On a page (upper-right corner) you will find `Key`

###### Tested on SonarQube v.5.6.6
