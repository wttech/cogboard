# Cypress Automated Functional Tests

## :construction: Work in progress :construction:

Tests in this part of the repository are testing UI of the CogBoard. Get to know helper functions available right now (and update them if needed).

## Running tests

### CLI

Quick use (i.e. before push):

`./gradlew functionalTests` - will launch all specs, with local env config file.

To override env add `-DcypressEnv=envName` system property. Which will run cypress config named `envName.json` under `functional/cypress-tests/cypress/config` directory. You must make sure that you created such a config in a first place.

To customize config and specs to be launched, you have to run:

`npx cypress run [--config-file path/to/config.json]`<sup>1</sup> `[--spec path/to/spec.js]`<sup>2</sup> from the `functional/cypress-tests` directory

<sup>1</sup> - provide custom config file path, by default it will use `functional/cypress-tests/cypress/config/local.json`.

<sup>2</sup> - provide spec file(s) to be launched. By default all specs are run.

### GUI

`npx cypress open` in `functional/cypress-tests` directory

## Contribution guide

All cypress related commits should be done on branches starting with `automation/`

### Tasks to do

...

### Coding conventions

All tests should be written according to [Cypress.io Best Practices guide](https://docs.cypress.io/guides/references/best-practices.html "Best Practices | Cypress Documentation"). Read it before starting to contribute.

Additional project specific conventions:

- For actions that have been already covered in other tests write `cy.request(...)` helper command to bypass UI and speed up the test execution time
  - Good example would be the Widget tests. Dashboard creation and dashboard removal steps are performed in each of those tests and take around 2.5s. If we have used API calls instead we would be lookng at `2.5s * numOfWidgets` time reduction.
- Keep test data in separate files. i.e. `../fixtures/Widgets.js`
- No test case dependencies. Each test's expected initial state should be either prepared manually or by `cy.request(...)` call before test starts.
- Actions that impact on other specs (such as saving) should be kept in the same spec.
- Repetitive tests should be written in iterative manner: i.e. `../integration/widgets.js` or FE validation tests in `../integration/dashboards.js`
- ...

## Available helpers

Use helpers below to minimize specfiles size. Keep in mind that some of those helpers require certain state of app to work correctly, make sure you learn their code.

### General

`cy.saveState()` - Saves current state of the Dashboard

### User

`cy.login()` - Log in with credentials specified in configuration file. - _Currently `../cypress.json`_

`cy.logout()` - Log out of the application

`getAuthenticationToken()` - Returns authentication token for username: admin

`loginWithToken()` - Log in as admin

### Dashboard

`cy.openDrawer()` - Open the Dashboard Drawer

`cy.closeDrawer()` - Close the Dashboard Drawer.

`cy.chooseDashboard(dashboardName)` - Switch to the Dashboard named `dashboardName`.

`cy.addDashboard(dashboardName, columnsCount, switchInterval, expectFailure)` - Add Dashboard with a name `dashboardName`, number of columns equal to `columnsCount`, switching interval set to `switchInterval` and `expectFailure` flag which will check if creation dialog has been closed when set to `false` or if creation dialog is still visible when set to `true`.

`cy.removeDashboard(dashboardNname)` - Remove the Dashboard named `dashboardName`.

`cy.renewDashboards(username, password)` - API call which generates dashboard specified in `../fixtures/reorderingConfig.json`

### Widget

`cy.clickAddWidgetButton()` - Click the Add Widget button visible after login.

`cy.fillNewWidgetGeneral(widgetType, title, newLine, disabled, columnsCount, rowsCount)` - Fill out the General Tab of the Widget Creation dialog. `widgetType` specifies Widget to be added, `title` is it's name, `newLine` will set the widget to be added on a next row, following the last existing widget on a Dashboard when set to `true`, `disabled` will make the widget disabled when set to `true`. `columnsCount` and `rowsCount` will determine number of, respectively, columns and rows.

`cy.fillSchedulePeriod(value)` - Fill out the Schedule Period field.

`cy.confirmAddWidget()` - Confirm creation of a widget.

`cy.removeWidget(name)` - Remove a widget on the page, specified by its name (title).

### Widget

`setTestCredentials(testCredentials, authToken)` - API call which adds new testCredentials

`setTestEndpoints(testEndpoints, authToken)` - API call which adds new testEndpoints
