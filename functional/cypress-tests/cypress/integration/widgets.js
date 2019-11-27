import Widgets from '../fixtures/Widgets'
import { fillDynamicTab } from '../support/widgetDynamicTab'
let example = Widgets.example
let dashboardName = 'Welcome to Cogboard';
let widgetsKeys = Object.keys(Widgets);

describe('Widgets', () => {

    beforeEach(() => {
        cy.visit('/');
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
            fillDynamicTab(name)
            cy.confirmAddWidget();
            cy.contains('h3', title)
                .should('is.visible');
            cy.removeWidget(title);
            cy.contains('h3', title)
                .should('not.visible');
        });
    };

    it('Example widget persistence', () => {
        cy.fillNewWidgetGeneral(example.name, example.name, false, false, 4, 2);
        fillDynamicTab(example.name);
        cy.confirmAddWidget();
        cy.contains('h3', example.name)
            .should('is.visible');
        cy.saveState();
        cy.visit('/');
        cy.openDrawer();
        cy.chooseDashboard(dashboardName);
        cy.contains('h3', example.name)
            .should('is.visible');
        cy.removeWidget(example.name);
        cy.saveState();
    });
})
