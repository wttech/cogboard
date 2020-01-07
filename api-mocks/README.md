# API Mocks

CogBoard uses WireMock for testing. As corresponding functional tests are required for acceptance of new widget some of those tests will require mocks of services the widget uses.

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