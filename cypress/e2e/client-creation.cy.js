import ClientPage from "../pages/app/client.page";
import { testClientValid } from '../fixtures/clients'
import ModalWindow from "../elements/modal-window";
import Dashboard from "../elements/dashboard";

describe('Client creation', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
        ClientPage.openModalWindow()
    })

    describe('SMOKE', () => {
        const name = testClientValid.companyName
        const phone = testClientValid.phone
        const email = testClientValid.email
        const description = testClientValid.description

        it('User is able to create a new client if only required fields are filled, new client is added on clients dashboard as the first element in the list', () => {

            ModalWindow.createClient(name, phone)
            cy.wait(1000)

            Dashboard.tableContent.find('a[href]').eq(0).invoke('text').then((text) => {
                expect(text).to.eq(name, '**Company name matches**')
            })

            Dashboard.tableContent.find('td').eq(1).invoke('text').then((text) => {
                expect(text).to.eq(phone, '**Phone matches**')
            })
        })

        it('User isn\'t able to create a new client if required fields are empty', () => {
            ModalWindow.field("Full Name", "name").type(name).clear()
            ModalWindow.field("Phone", "phone").type(phone).clear()
            ModalWindow.buttonSubmit.click()

            ModalWindow.fieldValidationSign('Full Name', 'Required').should('be.visible')
            ModalWindow.fieldValidationSign('Phone', 'Required').should('be.visible')
            ModalWindow.creatingForm.should('be.visible')
        })

        it('Client creation if all fields are filled', () => {

            ModalWindow.createClient2(name, phone, email, description)
            cy.wait(1000)

            Dashboard.tableContent.find('td').eq(0).invoke('text').then((text) => {
                expect(text).to.eq(name, '**Company name matches**')
            })

            Dashboard.tableContent.find('td').eq(1).invoke('text').then((text) => {
                expect(text).to.eq(phone, '**Phone matches**')
            })

            Dashboard.tableContent.find('td').eq(2).invoke('text').then((text) => {
                expect(text).to.eq(email, '**Email matches**')
            })

            // Dashboard.tableContent.find('td').eq(7).invoke('text').then((text) => {
            //     expect(text).to.eq(description)
            // })
        })
    })

    describe('Modal window content', () => {

        it('The sign \'Create Client\' exists on the Modal window', () => {
            ModalWindow.mainSign.should('be.visible').should('have.text', 'Create Client')
        })

        it('Modal window closes when "x" mark is clicked', () => {
            ModalWindow.markClose.click()
            Dashboard.tableContent.should('be.visible')
        })

        it('Modal window closes when clicking on the area outside modal window', () => {
            ClientPage.pageContent.click('bottomLeft')
            Dashboard.tableContent.should('be.visible')
        })
    })
})