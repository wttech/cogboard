class Endpoint {
  constructor(config, existing) {
    this.config = config;
    if (existing) {
      cy.contains('li.MuiListItem-container', config.label)
        .find('[data-cy="edit-endpoint-edit-button"]')
        .click();
    } else {
      cy.get('[data-cy="add-endpoint-add-button"]').click();
    }
  }

  applyConfig(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="endpoint-form-label-input"]')
      .clear()
      .type(this.config.label)
      .blur();
    cy.get('[data-cy="endpoint-form-url-input"]')
      .clear()
      .type(this.config.url)
      .blur();
    cy.get('[data-cy="endpoint-form-public-url-input"]')
      .clear()
      .type(this.config.publicUrl)
      .blur();

    if (this.config.credentials) {
      cy.get('[data-cy="endpoint-form-credentials-input"]').click();
      cy.get('[role="listbox"]').within(() => {
        cy.contains('li', this.config.credentials)
          .scrollIntoView()
          .click();
      });
    }
    return this;
  }

  save() {
    cy.get('[data-cy="endpoint-form-submit-button"]').click();
    return this;
  }

  cancel() {
    cy.get('[data-cy="endpoint-form-cancel-button"]').click();
    return this;
  }

  delete() {
    cy.contains('li.MuiListItem-container', this.config.label)
      .find('[data-cy="delete-endpoint-delete-button"]')
      .click();
    cy.get('[data-cy="confirmation-dialog-ok"]').click();
    return this;
  }

  assertErrorMessageVisible(message) {
    cy.contains('[data-cy^="endpoint-form-"]', message).should('is.visible');
    return this;
  }

  assertExists() {
    cy.get('[data-cy="app-dialog-content"]').should(
      'contain',
      this.config.label
    );
    return this;
  }
}

export function addEndpoint(config) {
  return new Endpoint(config, false);
}

export function loadEndpoint(config) {
  return new Endpoint(config, true);
}
