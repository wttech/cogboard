import Widgets from '../fixtures/Widgets'
import { fillDynamicTab } from '../support/widgetDynamicTab'
import { validateWidgetConfig } from '../support/widgetAssertions'
let example = Widgets.example
let dashboardName = 'Welcome to Cogboard';
let widgetsKeys = Object.keys(Widgets);

describe('Widgets', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.login();
        cy.openDrawer();
        cy.chooseDashboard(dashboardName);
        cy.removeWidget();
        cy.clickAddWidgetButton();
    });

    for (let i = 0; i < widgetsKeys.length; i++) {
        let widget = widgetsKeys[i];
        let name = Widgets[widget].name;

        it(`${name} can be configured and added by logged in user`, () => {
            cy.fillNewWidgetGeneral(name, name, false, false, 4, 2);
            fillDynamicTab(name)
            cy.confirmAddWidget();
            cy.contains('h3', name)
                .should('is.visible');
            // validateWidgetConfig(name); - in progress
            cy.removeWidget();
            cy.contains('h3', name)
                .should('not.visible');
        });
    };

    it('Example widget persistence', () => {
        cy.fillNewWidgetGeneral(example.name, example.name, false, false, 4, 2);
        fillDynamicTab(example.name);
        cy.confirmAddWidget();
        cy.contains('h3', example.name)
            .should('is.visible');
        // validateWidgetConfig(example.name); - in progress
        cy.saveState();
        cy.visit('/');
        cy.openDrawer();
        cy.chooseDashboard(dashboardName);
        cy.contains('h3', example.name)
            .should('is.visible');
        // validateWidgetConfig(example.name); - in progress
        cy.removeWidget();
        cy.saveState();
    });
})
