import { MAIN_SCREEN } from '../fixtures/selectors.js';

describe('Logout', () => {
    beforeEach(() => {
        cy.clearStorage();
        cy.visit('/');
    });
    it('User can logout', () => {
        cy.login();
        cy.clickAt(MAIN_SCREEN.LOGOUT_BUTTON);
        cy.isVisible(MAIN_SCREEN.LOGIN_BUTTON);
        cy.notExist(MAIN_SCREEN.LOGOUT_BUTTON);
    });
    it('Guest can logout', () => {
        cy.guestLogin();
        cy.clickAt(MAIN_SCREEN.LOGOUT_BUTTON);
        cy.isVisible(MAIN_SCREEN.LOGIN_BUTTON);
        cy.notExist(MAIN_SCREEN.LOGOUT_BUTTON);
    });
});
