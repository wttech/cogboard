/// <reference types="Cypress" />
import {
  testCredential,
  testEndpoint,
  testLbl,
  editedLbl
} from "../fixtures/credentialsEndpoints";

describe("Credentials and endpoints", () => {
  const timestamp = Date.now().toString();

  before(() => {
    cy.getAuthenticationToken().then(token => {
      cy.setTestCredentials(JSON.stringify(testCredential(timestamp)), token);
    });
    cy.getAuthenticationToken().then(token => {
      cy.setTestEndpoints(JSON.stringify(testEndpoint(timestamp)), token);
    });
  });

  context("Anonymous user", () => {
    it("Anonymous user: settings menu button is not available", () => {
      cy.visit("/");
      cy.get('[data-cy="settings-menu-open-button"]').should("not.be.visible");
    });
  });

  context("Logged in user - general check", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.loginWithToken();
      cy.get('[data-cy="settings-menu-open-button"]').click();
    });

    it("Logged-in user: settings panel is available with its elements", () => {
      cy.get('[data-cy="app-dialog-title"]')
        .find("h2")
        .should("have.text", "Settings");
      cy.get('button[aria-selected="true"]').should("have.text", "Endpoints");
      cy.get('[data-cy="add-endpoint-add-button"]').should("exist");

      cy.get('[data-cy="settings-menu-credentials-tab"]').click();

      cy.get('[data-cy="app-dialog-title"]')
        .find("h2")
        .should("have.text", "Settings");
      cy.get('button[aria-selected="true"]').should("have.text", "Credentials");
      cy.get('[data-cy="add-credential-add-button"]').should("exist");

      cy.get('[data-cy="settings-menu-endpoints-tab"]').click();

      cy.get('[data-cy="app-dialog-title"]')
        .find("h2")
        .should("have.text", "Settings");
      cy.get('button[aria-selected="true"]').should("have.text", "Endpoints");
      cy.get('[data-cy="add-endpoint-add-button"]').should("exist");
    });

    it("User can switch to add new credential form directly from add new endpoint form", () => {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
      cy.get('[data-cy="add-credential-add-button-small"]').click();
      cy.contains('[data-cy="app-dialog-title"]', "Add new credential").should(
        "exist"
      );
    });
  });

  context("Logged in user - endpoints", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.loginWithToken();
      cy.get('[data-cy="settings-menu-open-button"]').click();
    });

    it("Error messages are displayed when user submits empty / non valid form at endpoints tab", () => {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
      cy.get('[data-cy="endpoint-form-url-input"]').type(" ");
      cy.get('[data-cy="endpoint-form-public-url-input"]').type(" ");
      cy.get('[data-cy="endpoint-form-submit-button"]').click();
      cy.get('[data-cy="endpoint-form-label-input-error"]').should(
        "be.visible"
      );
      cy.get('[data-cy="endpoint-form-url-input-error"]').should("be.visible");
      cy.get('[data-cy="endpoint-form-public-url-input-error"]').should(
        "be.visible"
      );
      cy.get("p.MuiFormHelperText-root.Mui-error") // <= needs data-cy
        .should("be.visible");
    });

    it("User can add new endpoint. New endpoints label is visible", () => {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
      cy.get('[data-cy="endpoint-form-label-input"]')
        .type(testEndpoint(testLbl).label)
        .blur();

      cy.get('[data-cy="endpoint-form-url-input"]')
        .type(testEndpoint(testLbl).url)
        .blur();

      cy.get('[data-cy="endpoint-form-public-url-input"]')
        .type(testEndpoint(testLbl).publicUrl)
        .blur();

      cy.get('[data-cy="endpoint-form-credentials-input"]').click();
      cy.get('[role="listbox"]').within(() => {
        cy.contains("li", `${testCredential(timestamp).label}`).click();
      });
      cy.get('[data-cy="endpoint-form-submit-button"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "contain",
        testEndpoint(testLbl).label
      );
    });

    it("User cannot add endpoints with existing label", () => {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
      cy.get('[data-cy="endpoint-form-label-input"]')
        .type(testEndpoint(timestamp).label)
        .blur();
      cy.get('[data-cy="endpoint-form-label-input-error"]')
        .should("be.visible")
        .and("contain.text", "This field must be unique.");
    });

    it("User can edit existing endpoint", () => {
      cy.contains("li.MuiListItem-container", testEndpoint(testLbl).label) // <= no data-cy for this one
        .find('[data-cy="edit-endpoint-edit-button"]')
        .click();
      cy.get('[data-cy="endpoint-form-label-input"]')
        .clear()
        .type(testEndpoint(editedLbl).label)
        .blur();
      cy.get('[data-cy="endpoint-form-submit-button"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "contain",
        testEndpoint(editedLbl).label
      );
    });

    it("User can delete existing endpoint", () => {
      cy.contains("li.MuiListItem-container", testEndpoint(timestamp).label)
        .find('[data-cy="delete-endpoint-delete-button"]')
        .click();
      cy.get('[data-cy="confirmation-dialog-ok"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "not.contain",
        testEndpoint(timestamp).label
      );
    });
  });

  context("Logged in user - credentials", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.loginWithToken();
      cy.get('[data-cy="settings-menu-open-button"]').click();
      cy.get('[data-cy="settings-menu-credentials-tab"]').click();
    });

    it("Error messages are displayed when user submits empty / non valid form at credentials tab", () => {
      cy.get('[data-cy="add-credential-add-button"]').click();
      cy.get('[data-cy="credential-form-password-confirmation-input"]').type(
        " "
      );
      cy.get('[data-cy="credential-form-submit-button"]').click();
      cy.get('[data-cy="credential-form-label-input-error"]').should(
        "be.visible"
      );
      cy.get('[data-cy="credential-form-user-input-error"]').should(
        "be.visible"
      );
      cy.get('[data-cy="credential-form-password-input-error"]').should(
        "be.visible"
      );
      cy.get(
        '[data-cy="credential-form-password-confirmation-input-error"]'
      ).should("be.visible");
    });

    it("User can add new credentials. New credentials label is visible", () => {
      cy.get('[data-cy="add-credential-add-button"]').click();
      cy.get('[data-cy="credential-form-label-input"]')
        .type(testCredential(testLbl).label)
        .blur();

      cy.get('[data-cy="credential-form-user-input"]')
        .type(testCredential(testLbl).user)
        .blur();

      cy.get('[data-cy="credential-form-password-input"]')
        .type(testCredential(testLbl).password)
        .blur();

      cy.get('[data-cy="credential-form-password-confirmation-input"]')
        .type(testCredential(testLbl).password)
        .blur();
      cy.get('[data-cy="credential-form-submit-button"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "contain",
        testCredential(testLbl).label
      );
    });

    it("User cannot add credentials with existing label", () => {
      cy.get('[data-cy="add-credential-add-button"]').click();
      cy.get('[data-cy="credential-form-label-input"]')
        .type(testCredential(timestamp).label)
        .blur();
      cy.get('[data-cy="credential-form-label-input-error"]')
        .should("be.visible")
        .and("contain.text", "This field must be unique.");
    });

    it("User can edit existing credentials", () => {
      cy.contains("li.MuiListItem-container", testCredential(testLbl).label) // <= no data-cy for this one
        .find('[data-cy="edit-credential-edit-button"]')
        .click();
      cy.get('[data-cy="credential-form-label-input"]')
        .clear()
        .type("TC-EditedLabel")
        .blur();
      cy.get('[data-cy="credential-form-password-input"]')
        .type(testCredential(timestamp).password)
        .blur();
      cy.get('[data-cy="credential-form-password-confirmation-input"]')
        .type(testCredential(timestamp).password)
        .blur();
      cy.get('[data-cy="credential-form-submit-button"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "contain",
        "TC-EditedLabel"
      );
    });

    it("User can delete existing credentials", () => {
      cy.contains("li.MuiListItem-container", testCredential(timestamp).label)
        .find('[data-cy="delete-credential-delete-button"]')
        .click();
      cy.get('[data-cy="confirmation-dialog-ok"]').click();
      cy.get('[data-cy="app-dialog-content"]').should(
        "not.contain",
        testCredential(timestamp).label
      );
    });
  });
});
