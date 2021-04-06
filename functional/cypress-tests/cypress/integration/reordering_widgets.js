import { dashboardNameGen } from '../fixtures/Dashboard';
import { createWidget } from '../support/widget';
import Widgets from '../fixtures/Widgets';
import { addWidgetsDashboard } from '../support/dashboard';

describe('Reordering widgets', () => {
  const firstWidgetsTitle = 'First Widget';
  const secondWidgetsTitle = 'Second Widget';
  const thirdWidgetsTitle = 'Third Widget';
  let first, second, third, dashboard;

  before(() => {
    cy.visit('/');
    cy.login();
    dashboard = addWidgetsDashboard(
      dashboardNameGen('ReorderWidgetsTest')
    ).select();

    first = createCheckboxWidget(firstWidgetsTitle);
    second = createCheckboxWidget(secondWidgetsTitle);
    third = createCheckboxWidget(thirdWidgetsTitle);
  });

  it("Logged in user can reorder widgets, logged out user can't", () => {
    validateOrder('Verifying the initial order', [
      firstWidgetsTitle,
      secondWidgetsTitle,
      thirdWidgetsTitle
    ]);

    third.move(firstWidgetsTitle);

    validateOrder('Verifying if reordering widgets works', [
      thirdWidgetsTitle,
      firstWidgetsTitle,
      secondWidgetsTitle
    ]);

    first.move(thirdWidgetsTitle);

    validateOrder('Verifying if reordering widgets works', [
      firstWidgetsTitle,
      thirdWidgetsTitle,
      secondWidgetsTitle
    ]);
    cy.saveState();
    cy.logout();
    second.move(firstWidgetsTitle);

    validateOrder(
      'Verifying if user is unable to reorder widgets when logged out',
      [firstWidgetsTitle, thirdWidgetsTitle, secondWidgetsTitle]
    );

    cy.login();
    cy.get('[data-cy="navbar-show-drawer-button"]').click();
    dashboard.delete();
  });

  function createCheckboxWidget(title) {
    cy.clickAddWidgetButton();
    const widget = createWidget(Widgets.checkbox.name);
    widget.title = title;
    widget.configure(false);
    return widget;
  }

  function validateOrder(message, order) {
    let widgets = [];
    cy.get('[draggable="true"]')
      .each(widget => {
        cy.wrap(widget)
          .find('h3')
          .then(heading => {
            widgets.push(heading.text());
          });
      })
      .then(() => {
        expect(widgets, message).to.deep.equal(order);
      });
  }
});
