Cypress.Commands.add('getAuthenticationToken', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors'
    },
    body: { username: 'admin', password: 'admin' }
  }).then(result => `${result.headers['token']}`);
});

Cypress.Commands.add('loginWithToken', () => {
  cy.getAuthenticationToken()
    .then(token => window.localStorage.setItem('token', `${token}`))
    .then(() => {
      cy.visit('/');
    });
});
