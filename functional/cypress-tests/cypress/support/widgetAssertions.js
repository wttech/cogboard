import Widgets from '../fixtures/Widgets'

export function validateAemHealthcheck() {
    let healthcheckKeys = Object.keys(Widgets.aemHealthcheck.healthChecks);
    for (let i = 0; i < healthcheckKeys.length - 1; i++) {
          let healthcheck = healthcheckKeys[i];
          let label = Widgets.aemHealthcheck.healthChecks[healthcheck].label
          cy.contains('p', `${label}`)
            .should('is.visible');
      };

};

export function validateBambooPlan() {

};

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
};

export function validateExample() {

};

export function validateIframeEmbed() {

};

export function validateJenkinsJob() {
    cy.get('circle')
        .should('is.visible');
    cy.contains('p', 'master-branch')
        .should('is.visible');
    cy.contains('p', '19/11/2019, 13:04:53')
        .should('is.visible');
    cy.contains('p', '0.25 [s]')
        .should('is.visible')
    cy.contains('span', '#6')
        .should('is.visible');
};

export function validateServiceCheck() {

};

export function validateSonarQube() {

};

export function validateText() {

};

export function validateWorldClock() {

};

export function validateWidgetConfig(type = "Text") {
    if (type !== 'Default') {
        switch(type) {
            case "AEM Healthcheck":
                validateAemHealthcheck();
                break;
            case "Bamboo Plan":
                validateBambooPlan();
                break;
            case "Checkbox":
                validateCheckbox();
                break;
            case "Example":
                validateExample();
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
            case "SonarQube":
                validateSonarQube();
                break;
            case "Text":
                validateText();
                break;
            case "World Clock":
                validateWorldClock();
                break;
            default:
                break;
        };
    };
};