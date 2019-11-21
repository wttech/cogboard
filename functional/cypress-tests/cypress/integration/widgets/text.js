import Widgets from "../../fixtures/Widgets";
let text = Widgets.text;
let name = text.name;

function randomBoolean() {
  return Math.random() >= 0.5;
}

function fillText() {
  //Change selector (add data-cy in markup)
  cy.get('[name="content.text"]').type(text.text);
  //Change selector (add data-cy in markup)
  cy.get('[id="select-content.textSize"]').click();
  //Change selector (add data-cy in markup)
  cy.get('[data-value="h3"]').click();
  if (randomBoolean()) {
    //Change selector (add data-cy in markup)
    cy.get('[name="content.isVertical"]').click();
  }
}

describe("Widget - Text", function() {
  beforeEach(function() {
    cy.visit("/");
    cy.login();
  });

  it("Can be added by logged in user and doesn't persist without saving", () => {
    cy.addDashboard(name + " TEST");
    cy.chooseDashboard(name + " TEST");
    cy.saveState();
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral(name, name, false, false, 4, 2);
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    fillText();
    cy.confirmAddWidget();
    cy.contains("h3", name).should("is.visible");
    cy.visit("/");
    cy.openDrawer();
    cy.chooseDashboard(name + " TEST");
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("not.exist");
    cy.removeDashboard(name + " TEST");
    cy.saveState();
  });

  it("Remains on dashboard after save and refresh", () => {
    cy.addDashboard(name + " TEST");
    cy.chooseDashboard(name + " TEST");
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral(name, name, false, false, 4, 2);
    cy.get('[data-cy="widget-form-dynamic-tab"]').click();
    fillText();
    cy.confirmAddWidget();
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("is.visible");
    cy.saveState();
    cy.visit("/");
    cy.openDrawer();
    cy.chooseDashboard(name + " TEST");
    // Assertion below is pretty basic. To Do: thorough widget configuration assertions
    cy.contains("h3", name).should("is.visible");
    cy.removeDashboard(name + " TEST");
    cy.saveState();
  });
});
