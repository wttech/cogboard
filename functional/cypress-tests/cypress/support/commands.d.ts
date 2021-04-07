declare namespace Cypress {

    interface Chainable<Subject> {

        /**
         * - check checkbox
         * - @param element
         * - @param state (check/uncheck)
         * - @example cy.checkbox(element, check)
         */
        checkbox(): Chainable<any>;

        /**
         * - clear localStorage
         * - clear sessionStorage
         */
        clearStorage(): Chainable<any>;

        /**
         * - click at desired element
         * - @param element
         * - @example cy.clickAt(LOGIN.SUBMIT_BUTTON)
         */
        clickAt(): Chainable<any>;

        /**
         * - log guest into application
         * - @param username
         * - @example cy.guestLogin(user)
         */
        guestLogin(): Chainable<any>;

        /**
         * - check is element with text (if present) visible
         * - @param element
         * - @param text (optional)
         * - @example cy.isVisible(LOGIN.DIALOG_TITLE, 'text')
         */
        isVisible(): Chainable<any>;

        /**
         * - log user into application.
         * - @param username
         * - @param password
         * - @example cy.login('user','pass')
         */
        login(username?: string, password?: string): Chainable<any>;

        /**
         * - remove localStorage(token)
         * - remove sessionStorage(guestName)
         * - reload page state
         */
        logout(): Chainable<any>;

        /**
         * - check that element not exist
         * - @param element
         * - @example cy.notExist(LOGIN.DIALOG_TITLE)
         */
        notExist(): Chainable<any>;

        /**
         * - open page
         * - click login button
         * - check login form is visible
         */
        openLoginForm(): Chainable<any>;

        /**
         * - click save button
         * - wait 1000ms
         */
        saveState(): Chainable<any>;

        /**
         * - clear input
         * - type text (if present)
         * - @param element
         * - @param text (optional)
         * - @example cy.typeText(LOGIN.USERNAME_INPUT, 'admin')
         */
        typeText(): Chainable<any>;
    }

}
