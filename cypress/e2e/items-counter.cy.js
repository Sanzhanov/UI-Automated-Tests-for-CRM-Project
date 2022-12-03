import Pagination from "../elements/pagination";
import Dashboard from "../elements/dashboard";
import ClientPage from "../pages/app/client.page";

describe('Items counter', () => {
    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    it('Items counter shows correct number of items in dashboard', () => {
        let itemCount = 0
        const clickUntilDisabled = () => {
            Pagination.nextPageButton
                .then((btn) => {
                    if (btn.is(':disabled')) {
                        return
                    }
                    cy.wait(500)

                    Dashboard.tableContent
                        .find('a[href]')
                        .then(items => {
                            itemCount += Cypress.$(items).length;
                        });

                    cy.wrap(btn).click({force: true})
                    clickUntilDisabled()
                })
        }
        clickUntilDisabled()

        Pagination.itemsCounter.invoke('text').then((text) => {
            let count = +text.split(' ')[1]
            expect(itemCount).to.eq(count, '**Items counter works correctly**')
        })
    })
})