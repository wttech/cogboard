import { dashboardNameGen } from '../fixtures/Dashboard'

describe('Reordering', () => {

    beforeEach(() => {
        cy.visit('/');
    })

    it('Logged in user can reorder dashboards', () => {
        const dashboardName = dashboardNameGen();
        const dashboardName2 = dashboardNameGen() + 1;
        let boardCards = [];

        cy.login();
        cy.addDashboard(dashboardName);
        cy.closeDrawer();
        cy.addDashboard(dashboardName2);

        cy.get(`h3:contains("${dashboardName2}")`).drag(`h3:contains("${dashboardName}")`);

        cy.get('[alt="Cogboard logo"]')
            .type('{esc}');
        cy.openDrawer();
        cy.get('[data-cy="board-card"]')
            .each(boardCard => {
                cy.wrap(boardCard)
                    .find('h3')
                        .then(heading => {
                            boardCards.push(heading.text());
                })
            })
            .then(() => {
                for (let i = 0; i < boardCards.length; i++) {
                    if (boardCards[i] == dashboardName2 && boardCards[i+1] == dashboardName) {
                        i = boardCards.length;
                    } else if (i == boardCards.length - 1 && !(boardCards[i] == dashboardName2 && boardCards[i+1] == dashboardName)) {
                        throw new Error("Reording of dashboard is not working.");
                    };
                };
            });
    });

    xit('Logged in user can reorder widgets', () => {
        const dashboardName = dashboardNameGen();

        cy.login();
    })

    it('Logged out user can\'t reorder dashboards', () => {
        const dashboardName = dashboardNameGen();
        const dashboardName2 = dashboardNameGen() + 1;
        let boardCards = [];

        cy.login();
        cy.addDashboard(dashboardName);
        cy.closeDrawer();
        cy.addDashboard(dashboardName2);
        cy.get('[alt="Cogboard logo"]')
            .type('{esc}');
        cy.logout();
        cy.openDrawer();
        cy.get(`h3:contains("${dashboardName2}")`).drag(`h3:contains("${dashboardName}")`);
        cy.get('[data-cy="board-card"]')
            .each(boardCard => {
                cy.wrap(boardCard)
                    .find('h3')
                        .then(heading => {
                            boardCards.push(heading.text());
                })
            })
            .then(() => {
                for (let i = 0; i < boardCards.length; i++) {
                    if (boardCards[i] == dashboardName && boardCards[i+1] == dashboardName2) {
                        i = boardCards.length;
                    } else if (i == boardCards.length - 1 && !(boardCards[i] == dashboardName && boardCards[i+1] == dashboardName2)) {
                        throw new Error("Logged out user can reorder dashboards");
                    };
                };
            });
    })

    xit('Logged out user can\'t reorder widgets', () => {
        
    })
})