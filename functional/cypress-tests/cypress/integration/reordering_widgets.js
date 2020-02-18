import { dashboardNameGen } from '../fixtures/Dashboard';

describe('Reordering widgets', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Logged in user can reorder widgets, logged out user can't", () => {
    const dashboardName = dashboardNameGen('ReorderWidgetsTest');
    const firstWidgetsName = 'First Widget';
    const secondWidgetsName = 'Second Widget';
    const thirdWidgetsName = 'Third Widget';
    let widgets = [];

    cy.login();
    cy.addDashboard(dashboardName);
    cy.chooseDashboard(dashboardName);
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral('Checkbox', firstWidgetsName, false, false, 1, 1);
    cy.confirmAddWidget();
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral('Checkbox', secondWidgetsName, false, false, 1, 1);
    cy.confirmAddWidget();
    cy.clickAddWidgetButton();
    cy.fillNewWidgetGeneral('Checkbox', thirdWidgetsName, false, false, 1, 1);
    cy.confirmAddWidget();

    cy.get('[draggable="true"]')
      .each(widget => {
        cy.wrap(widget)
          .find('h3')
          .then(heading => {
            widgets.push(heading.text());
          });
      })
      .then(() => {
        expect(widgets, 'Verifying the initial state').to.deep.equal([
          firstWidgetsName,
          secondWidgetsName,
          thirdWidgetsName
        ]);
        widgets = [];
      });

    cy.get(`h3:contains("${thirdWidgetsName}")`).drag(
      `h3:contains("${firstWidgetsName}")`,
      'left'
    );

    cy.get('[draggable="true"]')
      .each(widget => {
        cy.wrap(widget)
          .find('h3')
          .then(heading => {
            widgets.push(heading.text());
          });
      })
      .then(() => {
        expect(widgets, 'Verifying if reordering widgets works').to.deep.equal([
          thirdWidgetsName,
          firstWidgetsName,
          secondWidgetsName
        ]);
        widgets = [];
      });

    cy.logout();

    cy.get(`h3:contains("${firstWidgetsName}")`).drag(
      `h3:contains("${thirdWidgetsName}")`,
      'left'
    );

    cy.get('[draggable="true"]')
      .each(widget => {
        cy.wrap(widget)
          .find('h3')
          .then(heading => {
            widgets.push(heading.text());
          });
      })
      .then(() => {
        expect(
          widgets,
          'Verifying if user is unable to reorder widgets when logged out'
        ).to.not.deep.equal([
          firstWidgetsName,
          thirdWidgetsName,
          secondWidgetsName
        ]);
      });

    cy.login();
    cy.removeDashboard(dashboardName);
  });
});
