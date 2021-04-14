import { LOGIN, MAIN_SCREEN } from '../fixtures/selectors';

Cypress.Commands.add('checkbox', (element, state) => {
  switch (state) {
    case 'check':
      cy.get(element).check();
      break;
    case 'uncheck':
      cy.get(element).uncheck();
      break;
    default:
      cy.log(`Invalid parameter for "checkbox" command`);
  }
});

Cypress.Commands.add('clickAt', element => {
  cy.get(element).click();
});

Cypress.Commands.add('clearStorage', () => {
  cy.clearLocalStorage();
  cy.window().then(window => {
    window.sessionStorage.clear();
  });
});

Cypress.Commands.add('guestLogin', (username = 'guestName') => {
  cy.window().then(window => {
    window.sessionStorage.setItem('guestName', username);
  });
  cy.reload();
});

Cypress.Commands.add('isVisible', (element, text) => {
  if (text) {
    cy.contains(element, text).should('is.visible');
  } else {
    cy.get(element).should('is.visible');
  }
});

Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {
  cy.request('POST', '/api/login', {
    username,
    password,
  }).then(response => {
    cy.window().then(window => {
      window.localStorage.setItem('token', response.headers.token);
    });
  });
  cy.reload();
});

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage('token');
  cy.window().then(window => {
    window.sessionStorage.removeItem('guestName');
  });
  cy.reload();
});

Cypress.Commands.add('notExist', element => {
  cy.get(element).should('not.exist');
});

Cypress.Commands.add('removeCredentials', credentialId => {
  const url = `/api/credentials/${credentialId}`;

  cy.request('DELETE', url, {});
  // cy.reload();
});

Cypress.Commands.add('saveState', () => {
  cy.get(MAIN_SCREEN.SAVE_BUTTON).click();
  cy.wait(1000);
});

Cypress.Commands.add('typeText', (element, text) => {
  cy.get(element).clear();
  if (text) {
    cy.get(element).type(text);
  }
});
