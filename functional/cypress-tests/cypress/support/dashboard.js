import { dashboardNameGen, dashboardTypes } from '../fixtures/Dashboard';

class Dashboard {
  constructor(name = dashboardNameGen(), type, columns, switchInterval) {
    this.name = name;
    cy.addDashboard(this.name, columns, switchInterval, type);
  }

  canBeSelected() {
    cy.contains('[data-cy="board-card"]', this.name).click();
    cy.contains('[data-cy="navbar-title-header"]', this.name).should('exist');
    return this;
  }

  assertIframeExists() {
    cy.get('iframe').should('is.visible');
    return this;
  }

  openEditDialog() {
    cy.contains('[data-cy="board-card"]', this.name)
      .find('[data-cy="board-card-edit-button"]')
      .scrollIntoView()
      .click();
    return this;
  }

  delete() {
    cy.contains('[data-cy="board-card"]', this.name)
      .find('[data-cy="board-card-delete-button"]')
      .scrollIntoView()
      .click();
    cy.get('[data-cy="confirmation-dialog-ok"]').click();
    return this;
  }

  setTitle(newTitle) {
    cy.get('[data-cy="board-form-title-input"]')
      .clear()
      .type(newTitle);
    return this;
  }

  confirmChanges() {
    cy.get('[data-cy="board-form-submit-button"]').click();
    return this;
  }

  assertCardTitle(newTitle) {
    cy.contains('[data-cy="board-card"] h3', newTitle)
      .scrollIntoView()
      .should('is.visible');
    return this;
  }

  assertTitle() {
    cy.contains('[data-cy="navbar-title-header"]', this.name)
      .scrollIntoView()
      .should('is.visible');
    return this;
  }

  assertNotVisible() {
    cy.contains('[data-cy="board-card"]', this.name).should('not.exist');
  }

  assertErrorMessageVisible(message) {
    cy.contains('[data-cy^="board-form-"]', message).should('is.visible');
    return this;
  }

  expectConfigToBeValid() {
    cy.contains('[data-cy="board-card"]', this.name)
      .scrollIntoView()
      .should('is.visible');
    cy.get('[data-cy="board-form-title-input-error"]').should('not.visible');
    return this;
  }

  expectConfigToBeInvalid() {
    cy.contains('h2', 'Add new board').should('is.visible');
    return this;
  }

  select() {
    cy.chooseDashboard(this.name);
    return this;
  }
}

export function addWidgetsDashboard(name, columns, switchInterval) {
  return new Dashboard(name, dashboardTypes.widgets, columns, switchInterval);
}

export function addIframeDashboard(name, columns, switchInterval) {
  return new Dashboard(name, dashboardTypes.iframe, columns, switchInterval);
}
