import {
  dashboardNameGen,
  columnEdgeValues,
  switchIntervalEdgeValues,
  dashboardNames
} from "../fixtures/Dashboard";

describe("Basic Dashboard CRUD", () => {
  let dashboardName = dashboardNameGen();
  let editDashboardName = dashboardNameGen("Edit");

  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it("Logged user can add new dashboard", () => {
    cy.addDashboard(dashboardName);
  });

  it("Logged user can choose dashboard", () => {
    cy.addDashboard(dashboardName);
    cy.contains('[data-cy="board-card"]', dashboardName).click();
    cy.contains('[data-cy="navbar-title-header"]', dashboardName).should(
      "exist"
    );
  });

  it("Anonymous user can choose dashboard", () => {
    cy.addDashboard(dashboardName);
    cy.closeDrawer();
    cy.logout();
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    cy.contains('[data-cy="board-card"]', dashboardName).click();
    cy.contains('[data-cy="navbar-title-header"]', dashboardName).should(
      "exist"
    );
  });

  it("Logged user can edit dashboard", () => {
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

  it("Logged user can remove dashboard", () => {
    cy.addDashboard(dashboardName);
    cy.contains('[data-cy="board-card"]', dashboardName)
      .find('[data-cy="board-card-delete-button"]')
      .scrollIntoView()
      .click();
    cy.get('[data-cy="confirmation-dialog-ok"]').click();
    cy.contains('[data-cy="board-card"]', dashboardName).should("not.exist");
  });
});

describe("Dashboard Frontend Validation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
  });

  it(" For empty dashboard name is displayed and submit is impossible", () => {
    cy.addDashboard(" ", "4", "10", true);
    cy.get('[data-cy="board-form-title-input-error"]').should("is.visible");
  });

  dashboardNames.forEach(value => {
    it(` For too long dashboard name is displayed and submit is impossible. Length: ${value.length}`, () => {
      cy.addDashboard(value, "8", "10", true);
      if (value.length > 25) {
        cy.contains(
          '[data-cy="board-form-title-input-error"]',
          "Title length"
        ).should("is.visible");
      } else {
        cy.get('[data-cy="board-form-title-input-error"]').should(
          "not.visible"
        );
      }
    });
  });

  columnEdgeValues.forEach(value => {
    it(` For Columns input is displayed and submit is impossible for incorrect values. Edge value : ${value}`, () => {
      cy.addDashboard(dashboardNameGen(), value, "10", true);
      if (value == "3" || value == "21") {
        cy.get('[data-cy="board-form-columns-input-error"]').should(
          "is.visible"
        );
      } else {
        cy.get('[data-cy="board-form-columns-input-error"]').should(
          "not.visible"
        );
      }
    });
  });

  switchIntervalEdgeValues.forEach(value => {
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
