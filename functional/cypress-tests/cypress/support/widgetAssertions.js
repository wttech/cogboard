import Widgets from "../fixtures/Widgets";

export function validateAemBundleInfo() {
  cy.contains("p", /^Total: [0-9]{1,4}/).should("is.visible");
  cy.contains("p", /^Active: [0-9]{1,4}/).should("is.visible");
  cy.contains("p", /^Fragmented: [0-9]{1,4}/).should("is.visible");
  cy.contains("p", /^Resolved: [0-9]{1,4}/).should("is.visible");
  cy.contains("p", /^Installed: [0-9]{1,4}/).should("is.visible");
}

export function validateAemHealthcheck() {
  const healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);
  for (let i = 0; i < healthcheckKeys.length; i++) {
    const healthcheck = healthcheckKeys[i];
    const label = Widgets.aemHealthcheck.healthChecks[healthcheck].label;
    cy.contains("p", `${label}`).should("is.visible");
  }
}

export function validateBambooDeployment() {
  cy.contains("p", /^Deployment State:IN_PROGRESS/).should("is.visible");
  cy.contains("p", /^Lifecycle State:IN_PROGRESS/).should("is.visible");
  cy.get("circle").should("is.visible");
  cy.contains("span", "3.1.43-SNAPSHOT (129)").should("is.visible");
  cy.contains("h3", `Test-${Widgets.bambooDeployment.name}`)
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(25, 140, 189)");
}

export function validateBambooPlan() {
  cy.contains("p", "Finished").should("is.visible");
  cy.contains("span", "1597").should("is.visible");
  cy.contains("h3", `Test-${Widgets.bambooPlan.name}`)
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(1, 148, 48)");
}

export function validateCheckbox() {
  cy.get('[data-cy="checkbox"]').click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(1, 148, 48)");
  cy.get('[data-cy="checkbox"]').click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(225, 49, 47)");
  cy.get('[data-cy="checkbox"]').click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(38, 36, 62)");
}

export function validateIframeEmbed() {
  cy.get("iframe").should("is.visible");
}

export function validateJenkinsJob() {
  cy.get("circle").should("is.visible");
  cy.contains("p", "master-branch").should("is.visible");
  cy.contains(
    "p",
    /[0-9]{2}.[0-9]{2}.[0-9]{4}, [0-9]{2}:[0-9]{2}:[0-9]{2}/
  ).should("is.visible");
  cy.contains("p", "0.25 [s]").should("is.visible");
  cy.contains("span", "#6").should("is.visible");
}

export function validateServiceCheck() {
  cy.contains("h3", `Test-${Widgets.serviceCheck.name}`)
    .parents('[draggable="true"]')
    .should("have.css", "background-color", "rgb(1, 148, 48)");
  cy.contains("p", "MATCH").should("is.visible");
  cy.contains("span", `${Widgets.serviceCheck.expectedStatusCode}`).should(
    "is.visible"
  );
}

export function validateSonarQube5x(type) {
  const metricKeys = Object.keys(Widgets.sonarQube5x.metrics);
  for (let i = 0; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const label = Widgets.sonarQube5x.metrics[metric].label;
    const value = Widgets.sonarQube5x.metrics[metric].value;
    cy.contains("p", `${label}`).should("is.visible");
  }
  cy.contains("h3", `${type}`)
    .parents('[draggable="true"]')
    .contains(
      "p",
      /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}, [0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}/
    )
    .should("is.visible");
}

export function validateSonarQube7x(type) {
  const metricKeys = Object.keys(Widgets.sonarQube7x.metrics);
  for (let i = 0; i < metricKeys.length; i++) {
    const metric = metricKeys[i];
    const label = Widgets.sonarQube7x.metrics[metric].label;
    const value = Widgets.sonarQube7x.metrics[metric].value;
    cy.contains("p", `${label}`).should("is.visible");
  }
}

export function validateText() {
  cy.contains("h3", `${Widgets.text.text}`).should("is.visible");
}

export function validateWorldClock() {
  cy.contains("h6", /^[0-9]{2}:[0-9]{2}:[0-9]{4}\/[0-9]{2}\/[0-9]{4}/).should(
    "is.visible"
  );
}

export function validateWidgetConfig(type = "Text", version = "") {
  const name = `${type}${version}`;
  if (name !== "WhiteSpace" && name !== "Example") {
    switch (name) {
      case "AEM Bundle Info":
        validateAemBundleInfo();
        break;
      case "AEM Healthcheck":
        validateAemHealthcheck();
        break;
      case "Bamboo Plan":
        validateBambooPlan();
        break;
      case "Checkbox":
        validateCheckbox();
        break;
      case "Iframe Embed":
        validateIframeEmbed();
        break;
      case "Jenkins Job":
        validateJenkinsJob();
        break;
      case "Service Check":
        validateServiceCheck();
        break;
      case "SonarQube 5.x":
        validateSonarQube5x(type);
        break;
      case "SonarQube 7.x":
        validateSonarQube7x(type);
        break;
      case "Text":
        validateText();
        break;
      case "World Clock":
        validateWorldClock();
        break;
      default:
        break;
    }
  }
}
