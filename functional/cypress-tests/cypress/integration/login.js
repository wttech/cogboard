describe('Login', () => {
    it('Login form validations', () => {
        cy.visit('/');
        cy.get('[data-cy="user-login-login-icon"]')
            .click();
        cy.get('[data-cy="user-login-username-input"]')
            .type('invalidUsername');
        cy.get('[data-cy="user-login-password-input"]')
            .type('invalidPassword')
            .type('{enter}');
        cy.get('[data-cy="user-login-error-messages"]')
            .should('be.visible');
        cy.get('[data-cy="user-login-username-input"]')
            .clear()
            .type(Cypress.env("username"));
        cy.get('[data-cy="user-login-submit-button"]')
            .click();
        cy.get('[data-cy="user-login-error-messages"]')
            .should('be.visible');
    });
    it('User can login', () => {
        cy.visit('/');
        cy.login();
    });
    it('Widget edit options are enabled', () => {
        cy.get('[data-cy="main-template-add-widget-button"]')
            .should('be.visible');
        cy.get('[data-cy="more-menu-button"]')
            .should('be.visible');
    });
    it('Dashboard edit options are enabled', () => {
        cy.get('[data-cy="navbar-show-drawer-button"]')
            .click();
        cy.get('[data-cy="add-board-add-button"]')
            .should('be.visible');
        cy.get('[data-cy="board-card-edit-button"]')
            .should('be.visible');
        cy.get('[data-cy="board-card-delete-button"]')
            .should('be.visible');
    });
});