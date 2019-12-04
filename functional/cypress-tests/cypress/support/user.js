Cypress.Commands.add(
  "login",
  (username = Cypress.env("username"), password = Cypress.env("password")) => {
    cy.get('[data-cy="user-login-login-icon"]').click();
    cy.get('[data-cy="user-login-username-input"]')
      .clear()
      .type(username);
    cy.get('[data-cy="user-login-password-input"]')
      .clear()
      .type(password);
    cy.get('[data-cy="user-login-submit-button"]').click();
    cy.contains(
      '[data-cy="notification-snackbar"]',
      "Logged in as " + Cypress.env("username")
    ).should("is.visible");
    cy.get('[data-cy="user-login-login-icon"]').should("not.exist");
  }
);

Cypress.Commands.add("logout", () => {
  cy.get('[data-cy="user-login-logout-icon"]').click();
  let username =
    Cypress.env("username")[0].toUpperCase() + Cypress.env("username").slice(1);
  cy.contains(
    '[data-cy="notification-snackbar"]',
    username + " logged out"
  ).should("is.visible");
  cy.get('[data-cy="user-login-logout-icon"]').should("not.exist");
});
