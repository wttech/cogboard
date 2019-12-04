import Widgets from '../fixtures/Widgets'
import { fillDynamicTab } from '../support/widgetDynamicTab'
import { validateWidgetConfig } from '../support/widgetAssertions'
let example = Widgets.example
let dashboardName = 'Welcome to Cogboard';
let widgetsKeys = Object.keys(Widgets);

describe("Widgets", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
    cy.openDrawer();
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
  });

  for (let i = 0; i < widgetsKeys.length; i++) {
    let widget = widgetsKeys[i];
    let name = Widgets[widget].name;
    let title = `Test-${name}`;

        it(`${name} can be configured and added by logged in user`, () => {
            cy.fillNewWidgetGeneral(name, title, false, false, 4, 2);
            fillDynamicTab(name);
            cy.confirmAddWidget();
            cy.contains('h3', title)
                .should('is.visible');
            validateWidgetConfig(name);
            cy.removeWidget(title);
            cy.contains('h3', title)
                .should('not.exist');
        });
    };

  it("Example widget can be disabled", () => {
    let title = `Test-${example.name}`;
    cy.fillNewWidgetGeneral(example.name, title, false, true, 4, 2);
    fillDynamicTab(example.name);
    cy.confirmAddWidget();
    cy.contains("Disabled").should("is.visible");
  });
});
