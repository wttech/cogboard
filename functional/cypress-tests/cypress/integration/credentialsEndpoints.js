/// <reference types="Cypress" />
import {
  testCredentials
} from '../fixtures/credentialsEndpoints'

describe('Credentials and endpoints', () => {

  after(() => {
    // remove 
  })

  context('Anonymous user', () => {
    
    // Anonymous user: settings menu button is not available
    it('Anonymous user: settings menu button is not available', () => {
      
      // 1. Enter CogBoard
      cy.visit('/');

      // 3. Assert that settings button is not available
      cy.get('[data-cy="settings-menu-open-button"]')
        .should('not.be.visible');
    });
  });
  
  context('Logged in user', () => {

    before(() => {
      // 3. set endpoints / credentials
      cy.loginWithToken();
      cy.getAuthenticationToken().then(token => {
        cy.setTestCredentials(JSON.stringify(testCredentials), token);
      });
    });
    
    beforeEach(() => {
  
      // 1. Enter CogBoard
      // cy.visit('http://localhost/');

      // 1. / 2. Login with token and visit CogBoard
      cy.loginWithToken();

      // 4. Click on settings button
      cy.get('[data-cy="settings-menu-open-button"]')
        .click();
    });

    // Logged-in user: settings panel is available with its elements
    it('Logged-in user: settings panel is available with its elements', () => {

      // 5. Check if all elements are visible (heading, tabs, edit icon, delete icon, add endpoint btn, exit btn)
      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]')
        .should('have.text', 'Endpoints');
      cy.get('[data-cy="add-endpoint-add-button"]')
        .should('exist');
        // TODO - check other elements

      // 6. Click on credentials tab
      cy.get('[data-cy="settings-menu-credentials-tab"]')
        .click();

      // 7. Check if all elements are visible (heading, tabs, edit icon, delete icon, add credential btn, exit btn)
      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]')
        .should('have.text', 'Credentials');
      cy.get('[data-cy="add-credential-add-button"]')
        .should('exist');

      // 8. Click on endpoints tab
      cy.get('[data-cy="settings-menu-endpoints-tab"]')
        .click();

      // 9. Check if all elements are visible (heading, tabs, edit icon, delete icon, add endpoint btn, exit btn)
      cy.get('[data-cy="app-dialog-title"]')
        .find('h2')
        .should('have.text', 'Settings');
      cy.get('button[aria-selected="true"]')
        .should('have.text', 'Endpoints');
      cy.get('[data-cy="add-endpoint-add-button"]')
        .should('exist');
    });

    // Error messages are displayed when user submits empty / non valid form at endpoints tab
    it('Error messages are displayed when user submits empty / non valid form at endpoints tab', () => {

      // 5. Click on add endpoint button
      cy.get('[data-cy="add-endpoint-add-button"]')
        .click();

      // 6. Fill-in the form with incorrect / empty values
      cy.get('[data-cy="endpoint-form-url-input"]')
        .type(' ');
      cy.get('[data-cy="endpoint-form-public-url-input"]')
        .type(' ');

      // 7. Click on save button
      cy.get('[data-cy="endpoint-form-submit-button"]')
        .click();

      // 8. Assert that all error msgs are displayed
      cy.get('[data-cy="endpoint-form-label-input-error"]')
        .should('be.visible');
      cy.get('[data-cy="endpoint-form-url-input-error"]')
        .should('be.visible');
      cy.get('[data-cy="endpoint-form-public-url-input-error"]')
        .should('be.visible');
      cy.get('p.MuiFormHelperText-root.Mui-error') // <= needs data-cy
        .should('be.visible');
    });

    // Error messages are displayed when user submits empty / non valid form at credentials tab
    it('Error messages are displayed when user submits empty / non valid form at credentials tab', () => {

      // 5. Click on credentials tab
      cy.get('[data-cy="settings-menu-credentials-tab"]')
        .click();

      // 6. Click on add credential button
      cy.get('[data-cy="add-credential-add-button"]')
        .click();

      // 7. Fill-in the form with incorrect values
      cy.get('[data-cy="credential-form-password-confirmation-input"]')
        .type(' ');

      // 8. Click on save button
      cy.get('[data-cy="credential-form-submit-button"]')
        .click();

      // 9. Assert that all error msgs are displayed
      cy.get('[data-cy="credential-form-label-input-error"]')
        .should('be.visible');
      cy.get('[data-cy="credential-form-user-input-error"]')
        .should('be.visible');
      cy.get('[data-cy="credential-form-password-input-error"]')
        .should('be.visible');
      cy.get('[data-cy="credential-form-password-confirmation-input-error"]')
        .should('be.visible');
    });

    // User can switch to add new credential form directly from add new endpoint form
    it('User can switch to add new credential form directly from add new endpoint form', () => {

      // 5. Click on add endpoint button
      cy.get('[data-cy="add-endpoint-add-button"]')
        .click();

      // 6. Click on add credential button
      cy.get('[data-cy="add-credential-add-button-small"]')
        .click();

      // 7. Assert that odd new credential form is displayed
      cy.contains('[data-cy="app-dialog-title"]', 'Add new credential')
        .should('exist');
    });

    // User can add new endpoint. New endpoints label is visible
    it('User can add new endpoint. New endpoints label is visible', () => {});
    
    // User can edit existing endpoint
    it('User can edit existing endpoint', () => {});
    
    // User can delete existing endpoint
    it('User can delete existing endpoint', () => {});
    
    // User can add new credentials. New credentials label is visible
    it('User can add new credentials. New credentials label is visible', () => {

      // 5. Click on credentials tab
      cy.get('[data-cy="settings-menu-credentials-tab"]')
        .click();

      // 6. Click on add credential button
      cy.get('[data-cy="add-credential-add-button"]')
        .click();

      // 7. Fill-in the form with correct values
      cy.get('[data-cy="credential-form-label-input"]')
        .type(testCredentials.label)
        .blur();

      cy.get('[data-cy="credential-form-user-input"]')
        .type(testCredentials.user)
        .blur();
        
      cy.get('[data-cy="credential-form-password-input"]')
        .type(testCredentials.password)
        .blur();
        
      cy.get('[data-cy="credential-form-password-confirmation-input"]')
        .type(testCredentials.password)
        .blur();
      
      // 8. Click on save button
      cy.get('[data-cy="credential-form-submit-button"]')
        .click();

      // 9. Check if newly added credential is displayed
      cy.get('[data-cy="app-dialog-content"]')
        .should('contain', testCredentials.label);
    });

    // User cannot add credentials with existing label
    it('User cannot add credentials with existing label', () => {

    });
    
    // User can edit existing credentials
    it('User can edit existing credentials', () => {

      // 5. Click on credentials tab
      cy.get('[data-cy="settings-menu-credentials-tab"]')
        .click();

      // 6. Click on edit credentials icon
      cy.contains('li.MuiListItem-container', testCredentials.label)
        .find('[data-cy="edit-credential-add-button"]')
        .click();

      // 7. Edit fields
      cy.get('[data-cy="credential-form-label-input"]')
        .clear()
        .type('EditedLabel')
        .blur();
        
      cy.get('[data-cy="credential-form-password-input"]')
        .type(testCredentials.password)
        .blur();
          
      cy.get('[data-cy="credential-form-password-confirmation-input"]')
        .type(testCredentials.password)
        .blur();

      // 8. Click save button
      cy.get('[data-cy="credential-form-submit-button"]')
        .click();

      // 9. Check if changes are visible
      cy.get('[data-cy="app-dialog-content"]')
        .should('contain', 'EditedLabel');

    });
    
    // User can delete existing credentials
    it('User can delete existing credentials', () => {});
    
  });
});