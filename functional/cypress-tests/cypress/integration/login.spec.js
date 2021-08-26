import { MAIN_SCREEN, LOGIN } from '../fixtures/selectors.js';

describe('Login', () => {
    beforeEach(() => {
        cy.clearStorage();
        cy.visit('/');
        cy.clickAt(MAIN_SCREEN.LOGIN_BUTTON);
    });
    it('Login form validations', () => {
        cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'uncheck');
        cy.typeText(LOGIN.USERNAME_INPUT, 'invalidUsername');
        cy.typeText(LOGIN.PASSWORD_INPUT, 'invalidPassword{enter}');
        cy.isVisible(LOGIN.ERROR_MESSAGE);
        cy.typeText(LOGIN.USERNAME_INPUT, Cypress.env('username'));
        cy.clickAt(LOGIN.SUBMIT_BUTTON);
        cy.isVisible(LOGIN.ERROR_MESSAGE);
        cy.typeText(LOGIN.USERNAME_INPUT);
        cy.typeText(LOGIN.PASSWORD_INPUT, '{enter');
        cy.isVisible(LOGIN.ERROR_MESSAGE);
    });
// TODO - after fix, add field required validation for guest user
    it('User can login', () => {
        cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'uncheck');
        cy.typeText(LOGIN.USERNAME_INPUT, Cypress.env('username'));
        cy.typeText(LOGIN.PASSWORD_INPUT, `${Cypress.env('password')}{enter}`);
        cy.isVisible(MAIN_SCREEN.NOTIFICATION_MESSAGE, `Logged in as ${Cypress.env('username')}`);
        cy.notExist(MAIN_SCREEN.LOGIN_BUTTON);
        cy.isVisible(MAIN_SCREEN.LOGOUT_BUTTON);
    });
    it('Guest can login', () => {
        cy.checkbox(LOGIN.GUEST_LOGIN_CHECKBOX, 'check');
        cy.typeText(LOGIN.USERNAME_INPUT, 'guestName{enter}');
        cy.isVisible(MAIN_SCREEN.NOTIFICATION_MESSAGE, 'Logged in as Guest: guestName');
        cy.notExist(MAIN_SCREEN.LOGIN_BUTTON);
        cy.isVisible(MAIN_SCREEN.LOGOUT_BUTTON);
    });
});
