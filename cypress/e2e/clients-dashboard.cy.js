import ClientPage from "../pages/app/client.page";
import ModalWindow from "../elements/modal-window";
import Dashboard from "../elements/dashboard";

describe('Clients page', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    describe('SMOKE', () => {
        it('Authorized user is able to open Clients Modal window', () => {
            ClientPage.buttonCreateClient.click()

            ModalWindow.creatingForm.should('be.visible')
            ModalWindow.mainSign.should('be.visible').should('have.text', 'Create Client')

            ModalWindow.markClose.click()
        })
    })

    describe('Clients dashboard', () => {

        it('Dashboard contains 20 items on the page by default', () => {
            //the first way
            Dashboard.tableContent.find('a[href]').its('length').should('eq', 20)
            //the second way
            Dashboard.tableContent
                .find('a[href]')
                .then(items => {
                    const itemCount = Cypress.$(items).length;
                    cy.log(`**Dashboard contains ${itemCount} items on the page**`)
                    expect(itemCount).to.eq(20, 'Assertion is true')
                });
        })
    })
})