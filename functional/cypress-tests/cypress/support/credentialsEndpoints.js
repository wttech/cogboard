Cypress.Commands.add('setTestCredentials', (testCredentials, authToken) => {
  cy.request({
    method: 'POST',
    url: '/api/credentials',
    auth: {
      bearer: authToken.split(' ')[1]
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors'
    },
    body: testCredentials,
    followRedirect: false,
    failOnStatusCode: true
  });
});

Cypress.Commands.add('openSettings', selectedTab => {
  cy.visit('/');
  cy.loginWithToken();
  cy.get('[data-cy="settings-menu-open-button"]').click();
  if (selectedTab) {
    cy.get(`[data-cy="${selectedTab}"]`).click();
  }
});

Cypress.Commands.add('setTestEndpoints', (testEndpoints, authToken) => {
  cy.request({
    method: 'POST',
    url: '/api/endpoints',
    auth: {
      bearer: authToken.split(' ')[1]
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors'
    },
    body: testEndpoints,
    followRedirect: false,
    failOnStatusCode: true
  });
});
