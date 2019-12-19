Cypress.Commands.add("saveState", () => {
  cy.get('[data-cy="main-template-save-data-button"]').click();
  cy.wait(200);
});
