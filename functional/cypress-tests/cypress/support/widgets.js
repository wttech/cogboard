Cypress.Commands.add("clickAddWidgetButton", () => {
  cy.get('[data-cy="main-template-add-widget-button"]').click();
});

Cypress.Commands.add(
  "fillNewWidgetGeneral",
  (
    type = "Text",
    title = "Text Title",
    newLine = false,
    disabled = false,
    columns = 2,
    rows = 4
  ) => {
    cy.get('[data-cy="widget-form-type-input"]').click();
    cy.contains("li", type).click();
    if (type !== "Checkbox" && type !== "White Space") {
      cy.contains("span", type).should("is.visible");
    }
    cy.get('[data-cy="widget-form-title-input"]')
      .clear()
      .type(title);
    cy.get('[data-cy="widget-form-columns-input"]').type(
      "{selectall}" + columns.toString()
    );
    cy.get('[data-cy="widget-form-rows-input"]').type(
      "{selectall}" + rows.toString()
    );
    if (newLine == true) {
      cy.get('[data-cy="widget-form-go-new-line-checkbox"]').click();
    }
    if (disabled == true) {
      cy.get('[data-cy="widget-form-disabled-input"]').click();
    }
  }
);

Cypress.Commands.add("fillSchedulePeriod", value => {
  cy.get('[data-cy="widget-form-schedule-period-input"]').type(
    "{selectall}" + value
  );
});

Cypress.Commands.add("confirmAddWidget", () => {
  cy.get('[data-cy="widget-form-submit-button"]').click();
});

Cypress.Commands.add("removeWidget", name => {
  cy.contains(name)
    .parents(".MuiCardHeader-root")
    .find('[data-cy="more-menu-button"]')
    .click();
  cy.get('div[id="more-menu"]')
    .not('[aria-hidden="true"]')
    .find('[data-cy="widget-delete"]')
    .click();
  cy.get('[data-cy="confirmation-dialog-ok"]').click();
});
