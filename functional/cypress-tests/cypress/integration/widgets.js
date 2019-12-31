import Widgets from "../fixtures/Widgets";
import { fillDynamicTab } from "../support/widgetDynamicTab";
import { validateWidgetConfig } from "../support/widgetAssertions";
const example = Widgets.example;
const dashboardName = "Welcome to Cogboard";
const widgetsKeys = Object.keys(Widgets);

describe("Widgets", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
  });

  for (let i = 0; i < widgetsKeys.length; i++) {
    const widget = widgetsKeys[i];
    const name = Widgets[widget].name;
    const title = `Test-${name}`;
    let version = "";
    if (name == "SonarQube") {
      version = ` ${Widgets[widget].version}`;
    }

    it(`${name}${version} can be configured and added by logged in user`, () => {
      cy.fillNewWidgetGeneral(name, title, false, false, 4, 2);
      fillDynamicTab(name, version);
      cy.confirmAddWidget();
      cy.contains("h3", title).should("is.visible");
      validateWidgetConfig(name, version);
      cy.removeWidget(title);
      cy.contains("h3", title).should("not.exist");
    });
  }

  it("Example widget can be disabled", () => {
    const title = `Test-${example.name}`;
    cy.fillNewWidgetGeneral(example.name, title, false, true, 4, 2);
    fillDynamicTab(example.name);
    cy.confirmAddWidget();
    cy.contains("Disabled").should("is.visible");
  });
});
