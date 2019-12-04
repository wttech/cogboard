describe("Logout", () => {
  it("User can logout", () => {
    cy.visit("/");
    cy.login();
    cy.logout();
  });
  it("Widget edit options are disabled", () => {
    cy.get('[data-cy="main-template-add-widget-button"]').should("not.exist");
    cy.get('[data-cy="more-menu-button"]').should("not.exist");
  });
  it("Dashboard edit options are disabled", () => {
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.get('[data-cy="add-board-add-button"]').should("not.exist");
    cy.get('[data-cy="board-card-edit-button"]').should("not.exist");
    cy.get('[data-cy="board-card-delete-button"]').should("not.exist");
  });
});
