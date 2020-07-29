class Credentials {
  constructor(config, existing) {
    this.config = config;
    if (existing) {
      cy.contains('li.MuiListItem-container', config.label)
        .find('[data-cy="edit-credential-edit-button"]')
        .click();
    } else {
      cy.get('[data-cy="add-credential-add-button"]').click();
    }
  }

  applyBasicAuth(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-label-input"]')
      .clear()
      .type(this.config.label)
      .blur();
    cy.get('[data-cy="credential-form-auth-user-input"]')
      .clear()
      .type(this.config.user)
      .blur();
    cy.get('[data-cy="credential-form-auth-password-input"]')
      .clear()
      .type(this.config.password)
      .blur();
    cy.get('[data-cy="credential-form-auth-password-confirmation-input"]')
      .clear()
      .type(this.config.passwordConf || this.config.password)
      .blur();
    return this;
  }

  applyTokenApi(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-token-tab"]').click();
    cy.get('[data-cy="credential-form-token-label-input"]')
      .clear()
      .type(this.config.label)
      .blur();
    cy.get('[data-cy="credential-form-token-user-input"]')
      .clear()
      .type(this.config.user)
      .blur();
    cy.get('[data-cy="credential-form-token-token-input"]')
      .clear()
      .type(this.config.token)
      .blur();
    return this;
  }

  save() {
    cy.get('[data-cy="credential-form-submit-button"]').click();
    return this;
  }

  assertExists() {
    cy.get('[data-cy="app-dialog-content"]').should(
      'contain',
      this.config.label
    );
    return this;
  }

  assertErrorMessageVisible(message, dataCYName) {
    cy.contains(`[data-cy^="${dataCYName}"]`, message).should('is.visible');
    return this;
  }
}

export function addCredentials(config) {
  return new Credentials(config, false);
}

export function loadCredentials(config) {
  return new Credentials(config, true);
}
