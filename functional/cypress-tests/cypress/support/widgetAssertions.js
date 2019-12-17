import Widgets from '../fixtures/Widgets';

export function validateAemHealthcheck() {
  let healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);
  for (let i = 0; i < healthcheckKeys.length; i++) {
    let healthcheck = healthcheckKeys[i];
    let label = Widgets.aemHealthcheck.healthChecks[healthcheck].label;
    cy.contains('p', `${label}`)
        .should('is.visible');
  }
}

export function validateBambooPlan() {
  cy.contains('p', 'Finished');
  cy.contains('span', '1597')
    .should('is.visible');
  cy.contains('h3', `Test-${Widgets.bambooPlan.name}`)
    .parents('[draggable="true"]')
    .should('have.css', 'background-color', 'rgb(1, 148, 48)');
}

export function validateCheckbox() {
  cy.get('[data-cy="checkbox"]')
    .click()
    .click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should('have.css', 'background-color', 'rgb(1, 148, 48)');
  cy.get('[data-cy="checkbox"]')
    .click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should('have.css', 'background-color', 'rgb(225, 49, 47)');
  cy.get('[data-cy="checkbox"]')
    .click();
  cy.get('[data-cy="checkbox"]')
    .parents('[draggable="true"]')
    .should('have.css', 'background-color', 'rgb(38, 36, 62)');
}

export function validateIframeEmbed() {
  cy.get('iframe')
    .should('is.visible');
}

export function validateJenkinsJob() {
  cy.get('circle')
    .should('is.visible');
  cy.contains('p', 'master-branch')
    .should('is.visible');
  cy.contains('p', /[0-9]{2}.[0-9]{2}.[0-9]{4}, [0-9]{2}:[0-9]{2}:[0-9]{2}/).
    should('is.visible');
  cy.contains('p', '0.25 [s]')
    .should('is.visible');
  cy.contains('span', '#6')
    .should('is.visible');
}

export function validateServiceCheck() {
  cy.contains('h3', `Test-${Widgets.serviceCheck.name}`)
    .parents('[draggable="true"]')
    .should('have.css', 'background-color', 'rgb(1, 148, 48)');
  cy.contains('p', 'MATCH')
    .should('is.visible');
  cy.contains('span', `${Widgets.serviceCheck.expectedStatusCode}`)
    .should('is.visible');
}

export function validateSonarQube() {
  let metricKeys = Object.keys(Widgets.sonarQube.metrics);
  for (let i = 0; i < metricKeys.length; i++) {
    let metric = metricKeys[i];
    let label = Widgets.sonarQube.metrics[metric].label;
    let value = Widgets.sonarQube.metrics[metric].value;
    cy.contains('p', `${label}`)
      .should('is.visible')
      .then(metric => {
        console.log(metric.text());
      });
  }
  cy.contains('span', `${Widgets.sonarQube.id}`)
    .should('is.visible');
  cy.contains('p', /[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}, [0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}/)
    .should('is.visible');
  cy.contains('p', '6.4.2.6-SNAPSHOT')
    .should('is.visible');
}

export function validateText() {
  cy.contains('h3', `${Widgets.text.text}`)
    .should('is.visible');
}

export function validateWorldClock() {
  cy.contains('h6', /^[0-9]{2}:[0-9]{2}:[0-9]{4}\/[0-9]{2}\/[0-9]{4}/)
    .should('is.visible');
}

export function validateWidgetConfig(type = 'Text') {
  if (type !== 'Default' && type !== 'Example') {
    switch (type) {
      case 'AEM Healthcheck':
        validateAemHealthcheck();
        break;
      case 'Bamboo Plan':
        validateBambooPlan();
        break;
      case 'Checkbox':
        validateCheckbox();
        break;
      case 'Iframe Embed':
        validateIframeEmbed();
        break;
      case 'Jenkins Job':
        validateJenkinsJob();
        break;
      case 'Service Check':
        validateServiceCheck();
        break;
      case 'SonarQube':
        validateSonarQube();
        break;
      case 'Text':
        validateText();
        break;
      case 'World Clock':
        validateWorldClock();
        break;
      default:
        break;
    }
  }
}
