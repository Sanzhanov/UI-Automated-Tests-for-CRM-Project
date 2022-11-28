import ClientPage from "../pages/app/client.page";
import faker from "faker";

describe('Client creation', () => {
    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    it('New client creation', () => {
        const name = faker.company.companyName()
        const phone = faker.phone.phoneNumberFormat()
        const email = faker.internet.email()
        const description = faker.lorem.paragraph()

        ClientPage.openModalWindow()
        ClientPage.createClientForm.should('be.visible')
        ClientPage.createClientSign.should('be.visible').should('have.text', 'Create Client')

        ClientPage.createClient(name, phone, email, description)

        ClientPage.clientDashboardName(name).should('be.visible')
        ClientPage.clientDashboardPhone(phone).should('be.visible')
        ClientPage.clientDashboardEmail(email).should('be.visible')
        //ClientPage.clientDashboardDescription(description).should('be.visible')
    })
})