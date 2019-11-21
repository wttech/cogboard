import {
  dashboardNameGen,
  columnEdgeValues,
  switchIntervalEdgeValues,
  dashboardNames
} from "../fixtures/Dashboard";

describe("Basic Dashboard CRUD", function() {
  let dashboardName = dashboardNameGen();
  let editDashboardName = dashboardNameGen("Edit");

  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Logged user can add new dashboard", function() {
    cy.addDashboard(dashboardName);
  });

  it("Logged user can choose dashboard", function() {
    cy.addDashboard(dashboardName);
    cy.contains('[data-cy="board-card"]', dashboardName).click();
    cy.contains('[data-cy="navbar-title-header"]', dashboardName).should(
      "exist"
    );
  });

  it("Anonymous user can choose dashboard", function() {
    cy.addDashboard(dashboardName);
    cy.closeDrawer();
    cy.logout();
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.contains('[data-cy="board-card"]', dashboardName).click();
    cy.contains('[data-cy="navbar-title-header"]', dashboardName).should(
      "exist"
    );
  });

  it("Logged user can edit dashboard", function() {
    cy.addDashboard(dashboardName);
    cy.contains('[data-cy="board-card"]', dashboardName)
      .find('[data-cy="board-card-edit-button"]')
      .scrollIntoView()
      .click();
    cy.get('[data-cy="board-form-title-input"]')
      .clear()
      .type(editDashboardName);
    cy.get('[data-cy="board-form-submit-button"]').click();
    cy.contains('[data-cy="board-card"]', editDashboardName)
      .scrollIntoView()
      .should("is.visible");
  });

  it("Logged user can remove dashboard", function() {
    cy.addDashboard(dashboardName);
    cy.contains('[data-cy="board-card"]', dashboardName)
      .find('[data-cy="board-card-delete-button"]')
      .scrollIntoView()
      .click(); //TODO add confirmation popup
    cy.contains('[data-cy="board-card"]', dashboardName).should("not.exist");
  });
});

describe("Dashboard Persistence", function() {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Not saved dashboard isn't displayed after refresh ", function() {
    let name = dashboardNameGen();
    cy.addDashboard(name);
    cy.visit("/");
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.contains('[data-cy="board-card"]', name).should("not.visible");
  });

  it("Saved dashboard is displayed after refresh", function() {
    let name = dashboardNameGen();
    cy.addDashboard(name);
    cy.saveState();
    cy.visit("/");
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.contains('[data-cy="board-card"]', name)
      .scrollIntoView()
      .should("is.visible");
    cy.contains('[data-cy="board-card"]', name)
      .find('[data-cy="board-card-delete-button"]')
      .scrollIntoView()
      .click();
    cy.saveState();
  });
});

describe("Dashboard Frontend Validation", function() {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it(" For empty dashboard name is displayed and submit is impossible", () => {
    cy.addDashboard(" ", "4", "10", true);
    cy.contains("li", "Title cannot be empty").should("is.visible");
    cy.contains("li", "Title is a required field").should("is.visible");
  });

  dashboardNames.forEach(function(value) {
    it(` For too long dashboard name is displayed and submit is impossible. Length: ${value.length}`, () => {
      cy.addDashboard(value, "8", "10", true);
      if (value.length > 25) {
        cy.contains(
          "li",
          "Title length must be less than or equal to 25"
        ).should("is.visible");
      } else {
        cy.contains(
          "li",
          "Title length must be less than or equal to 25"
        ).should("not.visible");
      }
    });
  });

  columnEdgeValues.forEach(function(value) {
    it(` For Columns input is displayed and submit is impossible for incorrect values. Edge value : ${value}`, () => {
      cy.addDashboard(dashboardNameGen(), value, "10", true);
      if (value == "3" || value == "21") {
        cy.get('[data-cy="board-form-columns-error"]').should("is.visible");
      } else {
        cy.get('[data-cy="board-form-columns-error"]').should("not.visible");
      }
    });
  });

  switchIntervalEdgeValues.forEach(function(value) {
    it(` For Switch Interval input is displayed and submit is impossible for incorrect values. Edge value: ${value}`, () => {
      cy.addDashboard(dashboardNameGen(), "8", value, true);
      if (value == "2") {
        cy.get('[data-cy="board-form-switch-interval-input"]').should(
          "is.visible"
        );
      } else {
        cy.get('[data-cy="board-form-switch-interval-input"]').should(
          "not.visible"
        );
      }
    });
  });
});
