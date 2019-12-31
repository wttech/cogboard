Cypress.Commands.add("saveState", () => {
  cy.get('[data-cy="main-template-save-data-button"]').click();
  cy.wait(200);
});

Cypress.Commands.add('setTestCredentials', (testCredentials, authToken) => {
  cy.request({
      method: 'POST',
      url: `/api/credentials`,
      auth: {
          'bearer': authToken.split(' ')[1]
      },
      headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors'
      },
      body: testCredentials,
        followRedirect: false,
        failOnStatusCode: true
  });     
});

Cypress.Commands.add('setTestEndpoints', (testEndpoints, authToken) => {
  cy.request({
      method: 'POST',
      url: `/api/endpoints`,
      auth: {
          'bearer': authToken.split(' ')[1]
      },
      headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-Mode': 'cors'
      },
      body: testEndpoints,
        followRedirect: false,
        failOnStatusCode: true
  });     
});