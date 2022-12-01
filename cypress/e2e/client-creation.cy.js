import ClientPage from "../pages/app/client.page";
import faker from "faker";
import ModalWindow from "../elements/modal-window";

describe('Client creation', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
        ClientPage.openModalWindow()
    })

    describe('SMOKE', () => {

        it('User is able to create a new client if only required fields are filled', () => {
            const name = faker.company.companyName()
            const phone = faker.phone.phoneNumberFormat()
            // const email = faker.internet.email()
            // const description = faker.lorem.paragraph()

            ClientPage.createClient(name, phone)

            ClientPage.clientDashboardName(name).should('be.visible')
            ClientPage.clientDashboardPhone(phone).should('be.visible')
            //ClientPage.clientDashboardEmail(email).should('be.visible')
            //ClientPage.clientDashboardDescription(description).should('be.visible')
        })

        it('User isn\'t able to create a new client if required fields are empty', () => {
            const name = faker.company.companyName()
            const phone = faker.phone.phoneNumberFormat()

            ClientPage.fieldClientFullName.type(name).clear()
            ClientPage.fieldClientPhone.type(phone).clear()
            ModalWindow.buttonSubmit.click()

            ClientPage.nameValidationSign.should('be.visible')
            ClientPage.phoneValidationSign.should('be.visible')
            ClientPage.modalWindow.creatingForm.should('be.visible')
        })
    })

    describe('Modal window content', () => {

        it('The sign \'Create Client\' exists on the Modal window', () => {
            ClientPage.modalWindow.mainSign.should('be.visible').should('have.text', 'Create Client')
        })

        it('Modal window closes when "x" mark is clicked', () => {
            ClientPage.modalWindow.markClose.click()
            ClientPage.buttonCreateClient.should('be.visible')
        })

        it('Modal window closes when clicking on the area outside modal window', () => {
            cy.get('.ant-drawer-mask').click('bottomLeft')
            ClientPage.buttonCreateClient.should('be.visible')
        })
    })
})