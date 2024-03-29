import { renewConfig } from './helpers';
import { dashboardTypes } from '../fixtures/Dashboard';

Cypress.Commands.add('openDrawer', () => {
  cy.get('[data-cy="navbar-show-drawer-button"]').click();
});

Cypress.Commands.add('closeDrawer', () => {
  cy.get('[alt="Cogboard logo"]')
    .scrollIntoView()
    .click();
});

Cypress.Commands.add('chooseDashboard', dashboardName => {
  cy.contains('[data-cy="board-card"]', dashboardName)
    .scrollIntoView()
    .click();
});

Cypress.Commands.add(
  'addDashboard',
  (
    dashboardName = 'Dashboard_' + Date.now().toString(),
    columns = '4',
    switchInterval = '10',
    dashboardType = dashboardTypes.widgets
  ) => {
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.get('[data-cy="add-board-add-button"]').click();
    cy.get('[data-cy="board-form-title-input"]')
      .clear()
      .type(dashboardName);
    cy.get('[data-cy="board-form-type-input"]').click();
    cy.contains('li', dashboardType).click();
    cy.get('[data-cy="board-form-auto-switch-input"]').click();
    cy.get('[data-cy="board-form-switch-interval-input"]').type(
      '{selectall}' + switchInterval
    );
    if (dashboardType !== dashboardTypes.iframe) {
      cy.get('[data-cy="board-form-columns-input"]').type(
        '{selectall}' + columns
      );
    }
    if (dashboardType === dashboardTypes.iframe) {
      cy.get('[data-cy="board-form-iframe-url-input"]')
        .clear()
        .type('http://localhost:8093/jenkins/ok.html');
    }
    cy.get('[data-cy="board-form-submit-button"]').click();
  }
);

Cypress.Commands.add('removeDashboard', dashboardName => {
  cy.openDrawer();
  cy.contains('[data-cy="board-card"]', dashboardName)
    .find('[data-cy="board-card-delete-button"]')
    .scrollIntoView()
    .click();
  cy.get('[data-cy="confirmation-dialog-ok"]').click();
});

Cypress.Commands.add(
  'renewDashboards',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.request('post', 'http://host.docker.internal/api/login', {
      username: username,
      password: password
    }).then(response => {
      const loginBody = response.headers['token'].split(' ');
      const token = loginBody[1];

      cy.request('http://host.docker.internal/api/config').then(response => {
        cy.fixture('reorderingConfig').then(reorderConfig => {
          let config = JSON.parse(response.body);

          config = renewConfig(config, reorderConfig);
          cy.request({
            url: 'http://host.docker.internal/api/config/save',
            method: 'post',
            auth: { bearer: token },
            body: config
          });
        });
      });
    });
  }
);
