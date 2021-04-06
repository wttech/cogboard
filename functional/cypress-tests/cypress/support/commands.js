import { LOGIN, MAIN_SCREEN } from '../fixtures/selectors';

Cypress.Commands.add('clearStorage', () => {
  cy.clearLocalStorage();
  cy.window().then(window => {
    window.sessionStorage.clear();
  });
});

Cypress.Commands.add('guestLogin', (username = 'guestName') => {
  cy.window().then(window => {
    window.sessionStorage.setItem("guestName", username)});
  cy.reload();
});

Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  cy.request(
    'POST',
    '/api/login',
    {
      username,
      password
    }
  ).then((response) => {
    cy.window().then(window => {
      window.localStorage.setItem("token", response.headers['token'])
    })
  });
  cy.reload();
});

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage('token');
  cy.window().then(window => {
    window.sessionStorage.removeItem('guestName')
  });
  cy.reload();
});

Cypress.Commands.add('openDashboardsList', () => {
  cy.get(MAIN_SCREEN.DASHBOARDS_LIST_BUTTON)
    .click();
});

Cypress.Commands.add('openLoginForm', () => {
  cy.visit('/');
  cy.get(MAIN_SCREEN.LOGIN_BUTTON)
    .click();
  cy.get(LOGIN.DIALOG_CONTENT)
    .should('be.visible');
});

Cypress.Commands.add('saveState', () => {
  cy.get('[data-cy="main-template-save-data-button"]').click();
  cy.wait(1000);
});
