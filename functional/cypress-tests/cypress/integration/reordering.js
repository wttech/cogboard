import { dashboardNameGen } from '../fixtures/Dashboard';

describe('Reordering', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Logged in user can reorder dashboards', () => {
    const dashboardName = dashboardNameGen();
    const dashboardName2 = dashboardNameGen() + 1;
    const boardCards = [];

    cy.login();
    cy.addDashboard(dashboardName);
    cy.closeDrawer();
    cy.addDashboard(dashboardName2);

    cy.get(`h3:contains("${dashboardName2}")`).drag(
      `h3:contains("${dashboardName}")`
    );

    cy.get('[alt="Cogboard logo"]').type('{esc}');
    cy.openDrawer();
    cy.get('[data-cy="board-card"]')
      .each(boardCard => {
        cy.wrap(boardCard)
          .find('h3')
          .then(heading => {
            boardCards.push(heading.text());
          });
      })
      .then(() => {
        for (let i = 0; i < boardCards.length; i++) {
          if (
            boardCards[i] == dashboardName2 &&
            boardCards[i + 1] == dashboardName
          ) {
            i = boardCards.length;
          } else if (
            i == boardCards.length - 1 &&
            !(
              boardCards[i] == dashboardName2 &&
              boardCards[i + 1] == dashboardName
            )
          ) {
            throw new Error('Reording of dashboard is not working.');
          }
        }
      });
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

  it("Logged out user can't reorder dashboards", () => {
    const dashboardName = dashboardNameGen();
    const dashboardName2 = dashboardNameGen() + 1;
    const boardCards = [];

    cy.login();
    cy.addDashboard(dashboardName);
    cy.closeDrawer();
    cy.addDashboard(dashboardName2);
    cy.get('[alt="Cogboard logo"]').type('{esc}');
    cy.logout();
    cy.openDrawer();
    cy.get(`h3:contains("${dashboardName2}")`).drag(
      `h3:contains("${dashboardName}")`
    );
    cy.get('[data-cy="board-card"]')
      .each(boardCard => {
        cy.wrap(boardCard)
          .find('h3')
          .then(heading => {
            boardCards.push(heading.text());
          });
      })
      .then(() => {
        for (let i = 0; i < boardCards.length; i++) {
          if (
            boardCards[i] == dashboardName &&
            boardCards[i + 1] == dashboardName2
          ) {
            i = boardCards.length;
          } else if (
            i == boardCards.length - 1 &&
            !(
              boardCards[i] == dashboardName &&
              boardCards[i + 1] == dashboardName2
            )
          ) {
            throw new Error('Logged out user can reorder dashboards.');
          }
        }
      });
  });
});
