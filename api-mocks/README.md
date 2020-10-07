# API Mocks

CogBoard uses WireMock to mimic responses of third party software that can be a data source for Cogboard. This allows us to tests widgets without need to keep whole infrastructure.

## File structure

* Mocks themselves are stored in `__files` directory,
* Inside it are directories for each of the widget/group of widgets,
* The deepest directory is a version of the app, as CogBoard supports multiple versions of some of the apps,
* Mocks are named in a descriptive way formats matching those returned by the actual app.

Examples:

* `__files/aem/v6.5.2/bundleinfo.json` - Mock for Bundle Info widget, schema is matching the one that AEM v6.5.2 responds with,
* `__files/sonarqube/v7.x/fail.json` - SonarQube, version 7.x, with a failing status.

Please stick to this convention to maintain order.

## Preparing a mock

1. Get a body of the service's response and place it accordingly to the convention<sup>1</sup>,
2. Open `mappings/endpoints-mapping.json` and create an entry<sup>2</sup> for it, so that WireMock knows where to look for the body,
3. Run `./gradlew updateMocks` in project's root directory, to update mappings locally.

<sup>1</sup> - Remember to make sure there aren't any traces to where did the body come from (project ids, names, artifacts etc.) if you have taken it from a running instance of a given service.

<sup>2</sup> - If widget has different states (i.e. Failure and Success), and in turn - multiple mocks, they should be grouped together - meaning, be placed in sequence.

## Infrastructure

WireMock runs only in Development setup. It is running inside of a Docker container inside of a network of containers, along with `cogboard-app` and `cogboard-webapp`. WireMock container is named `cogboard-local_api-mocks` and runs on `8093:8080` port mapping.

## Using mocks

All mocks require running `cogboard-local_api-mocks` container, and choosing `API Mocks Endpoint` in the Endpoint dropdown on dynamic tab of widget creation dialog.

### AEM Bundle Info

**Versions:** 6.x

**Number of mocks:** One, modifiable

**Default state:** OK - all bundles are active

**How to use:** Select threshold for Resolved and Installed status to match the number of them in the mock. Excluded bundles input accepts both name and symbolic name of a bundle, i.e. `System Bundle` or `org.apache.felix.framework`.

**How to customize:** Change values of the array stored in the key **s**. It's default value is `[651, 646, 5, 0, 0]`. From left to right those values mean: all bundles, active bundles, fragmeneted bundles, resolved bundles and installed bundles. To check bundle exclusion remember to change it's state to one of available ones.

### AEM Healthcheck

**Versions:** 6.x

**Number of mocks:** One, modifiable

**Default state:** WARN - Some healthchecks fail.

**How to use:** Make sure all 14 health checks are selected in the `Health Checks` dropdown.

**How to customize:** To induce OK state find all occurences of word `WARN` and change them to `OK`. To induce CRITICAL state, find all occurences of `WARN` and `OK` and change them to `CRITICAL`.

### Bamboo Deployment

**Versions:** 6.7.2

**Number of mocks:** Eight, one for each of possible states.

**Possible states:**
* Successful - `ID = 1`,
* Failed - `ID = 2`,
* In Progress - `ID = 3`,
* Replaced - `ID = 4`,
* Skipped - `ID = 5`,
* Never - `ID = 6`,
* Queued - `ID = 7`,
* Not Built - `ID = 8`.

**How to use:** In dynamic tab of Bamboo Deployment type correct number from above in the `ID` input.

### Bamboo Plan

**Versions:** 6.7.2

**Number of mocks:** Three, one for each of possible states.

**Possible states:**
* Successful - `ID = CGB-SCS`,
* Failed - `ID = CGB-FLD`,
* Unknown - `ID = CGB-UKWN`.

**How to use:** In dynamic tab of Bamboo Plan type correct ID in the `ID` input.

### Jenkins Job

**Versions:** 2.46.3

**Number of mocks:** Three, one for each of possible states.

**Possible states:**
* Success - `PATH = /job/CogBoard/job/success`,
* Fail - `PATH = /job/CogBoard/job/fail`,
* In Progress - `PATH = /job/CogBoard/job/in-progress`.

**How to use:** In dynamic tab of Jenkins Job type correct path in the `Path` input.

### Service Check

**How to use:** To Do

### SonarQube

**Versions:** 5.x, 7.x

**Number of mocks:** Six, three mocks per each state per each version.

**Possible states:**
* Success - `KEY = success`
* Fail - `KEY = fail`
* Warning - `KEY = warning`

**How to use:** In dynamic tab of SonarQube select version of SonarQube in the dropdown, then type correct Key in the `Key` input. For 5.x you could also type 316488 in the `ID` field. **Important - select all metrics**.

### Zabbix

**Number of mocks** eight mocks per each metric, one mock for authorize, one mock for authorization error

**Possible states** TODO

**How to use:** In dynamic tab of Zabbix widget:
* add new endpoint: `http://api-mocks:8080/zabbix/api_jsonrpc.php`
* add new credentials: `username: admin`, `password: admin`