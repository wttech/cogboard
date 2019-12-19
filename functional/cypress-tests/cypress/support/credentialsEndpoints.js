Cypress.Commands.add('addNewCredentialFormFill', (label, username, password) => {
  cy.get('[data-cy="credential-form-label-input"]')
  .type(label)
  .blur();

cy.get('[data-cy="credential-form-user-input"]')
  .type(username)
  .blur();
  
cy.get('[data-cy="credential-form-password-input"]')
  .type(password)
  .blur();
  
cy.get('[data-cy="credential-form-password-confirmation-input"]')
  .type(password)
  .blur();
});