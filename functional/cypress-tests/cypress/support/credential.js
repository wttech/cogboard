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

  applyMandatoryFields(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-label-input"]')
      .clear()
      .type(this.config.label)
      .blur();
    return this;
  }

  applyUser(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-user-input"]')
      .clear()
      .type(this.config.user)
      .blur();
    return this;
  }

  applyPassword(config) {
    if (config !== undefined) {
      this.config = config;
    }
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

  applyToken(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-token-input"]')
      .clear()
      .type(this.config.token)
      .blur();
    return this;
  }

  applySSHKey(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-ssh-key-input"]')
      .clear()
      .type(this.config.sshKey)
      .blur();
    return this;
  }

  applySSHKeyPassphrase(config) {
    if (config !== undefined) {
      this.config = config;
    }
    cy.get('[data-cy="credential-form-auth-ssh-key-passphrase-input"]')
      .clear()
      .type(this.config.sshKeyPassphrase)
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

  assertTabDisappear() {
    cy.get('[data-cy="app-credential-form-tab"]').should('not.be.visible');
    return this;
  }

  assertErrorMessageVisible(message, dataCYName) {
    cy.contains(`[data-cy^="${dataCYName}"]`, message)
      .scrollIntoView()
      .should('is.visible');
    return this;
  }
}

export function addCredentials(config) {
  return new Credentials(config, false);
}

export function loadCredentials(config) {
  return new Credentials(config, true);
}
