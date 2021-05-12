declare namespace Cypress {
  interface Chainable<Subject> {

    /**
     * - add credentials
     * - @param label
     * - @param user
     * - @param password
     * - @param token
     * - @example cy.addCredentials('label', 'username', 'pass', '123abc');
     */
    addCredentials(label: string, user: string, password: string, token: string): Chainable<any>;

    /**
     * - check checkbox
     * - @param element
     * - @param state (check/uncheck)
     * - @example cy.checkbox(element, check);
     */
    checkbox(element: string, state: string): Chainable<any>;

    /**
     * - clear localStorage
     * - clear sessionStorage
     * - @example cy.clearStorage();
     */
    clearStorage(): Chainable<any>;

    /**
     * - click at desired element
     * - @param element
     * - @example cy.clickAt(LOGIN.SUBMIT_BUTTON);
     */
    clickAt(element: string): Chainable<any>;

    /**
     * - log guest into application
     * - @param username
     * - @example cy.guestLogin(user);
     */
    guestLogin(username?: string): Chainable<any>;

    /**
     * - check is element with text (if present) visible
     * - @param element
     * - @param text (optional)
     * - @example cy.isVisible(LOGIN.DIALOG_TITLE, 'text');
     */
    isVisible(element: string, text?: string): Chainable<any>;

    /**
     * - log user into application.
     * - @param username
     * - @param password
     * - @example cy.login('user','pass');
     */
    login(username?: string, password?: string): Chainable<any>;

    /**
     * - remove localStorage(token)
     * - remove sessionStorage(guestName)
     * - reload page
     * - @example cy.logout();
     */
    logout(): Chainable<any>;

    /**
     * - check that element not exist
     * - @param element
     * - @param text
     * - @example cy.notExist(LOGIN.DIALOG_TITLE, 'title');
     */
    notExist(element: string, text?: string): Chainable<any>;

    /**
     * - removing credential with given id
     * - @param id
     * - @example cy.removeCredentials(credentialId);
     */
    removeCredentials(id: string): Chainable<any>;

    /**
     * - click save button
     * - wait 1000ms
     * - @example cy.saveState();
     */
    saveState(): Chainable<any>;

    /**
     * - clear input
     * - type text (if present)
     * - @param element
     * - @param text (optional)
     * - @example cy.typeText(LOGIN.USERNAME_INPUT, 'admin');
     */
    typeText(element: string, text?: string): Chainable<any>;
  }
}
