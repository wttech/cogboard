Cypress.Commands.add("saveState", () => {
  cy.get('[data-cy="main-template-save-data-button"]').click();
  cy.wait(200);
});

Cypress.Commands.add('getAuthenticationToken',() => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors'
    },
    body: {'username': "admin", 'password': "admin"}
  }).then(result => `${result.body.token}`)
});

Cypress.Commands.add('setTestCredentials', (testCredentials, authToken) => {
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
          'Sec-Fetch-Mode': 'cors',
          'Referer': 'http://localhost/',
          'Host': 'localhost'
      },
      body: testCredentials,
        followRedirect: false,
        failOnStatusCode: true
  });     
});

