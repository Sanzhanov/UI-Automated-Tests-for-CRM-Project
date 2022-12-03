import Pagination from "../elements/pagination";
import ClientPage from "../pages/app/client.page";

describe('Pagination', () => {
    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    it('The first page is active by default', () => {
        Pagination.activePage.should('have.text', '1')
    })

    it('When the user clicks on the Next button the user should be navigated to the next page,' +
        'When the user is on the last page then Next button should be disabled', () => {

        const clickUntilDisabled = () => {
            Pagination.nextPageButton
                .then((btn) => {
                    if (btn.is(':disabled')) {
                        return
                    }
                    cy.wait(500)
                    cy.wrap(btn).click({force: true})

                    Pagination.activePage.invoke('text').then((text) => {
                        cy.log(`**Current page is ${text}**`)
                    })
                    clickUntilDisabled()
                })
        }
        clickUntilDisabled()
        cy.log('**Current page is last page**')

        Pagination.nextPageButton.should('be.disabled')
        Pagination.nextPageButton.should('have.attr', 'disabled')
    })

    it('When the user clicks on the Prev button the user should be navigated to the previous page,' +
        'When the user is on the first page then Prev button should be disabled', () => {

        Pagination.nextPageButton.click()
        Pagination.activePage.invoke('text').then((text) => {
            cy.log(`**Current page is ${text}**`)
        })
        Pagination.previousPageButton.click()
        Pagination.activePage.invoke('text').then((text) => {
            cy.log(`**Current page is ${text}**`)
        })

        Pagination.previousPageButton.should('be.disabled')
        Pagination.previousPageButton.should('have.attr', 'disabled')
    })
})