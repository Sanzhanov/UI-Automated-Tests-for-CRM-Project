import UserProfilePage from "../pages/app/user-profile.page";

describe('User profile', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        UserProfilePage.open()
    })

    describe('Endpoint', () => {
        it('Endpoint after page load is correct endpoint', () => {
            cy.url().should('include', `/v5/profile/${Cypress.env('USER_ID')}`)
        })
    })

    describe('MAIN CONTENT', () => {
        it('User profile contains correct user name', () => {
            cy.xpath('//h1[text()]').should('have.text', `${Cypress.env('USER_NAME')}`)
        })

        it('User profile table contains correct company name', () => {
            cy.xpath('//tr[td[text()="Company"]]//a').should('have.text', 'Alice Inc')
        })

        it('Company name is the link to the Company account page', () => {
            cy.xpath('//tr[td[text()="Company"]]//a').click()

            cy.location('pathname').should('eq', `/v5/company/${Cypress.env('COMPANY_ID')}`)
        })

        it('User profile table contains correct user role', () => {
            cy.xpath('//tr[td[text()="Roles"]]//td[2]').should('have.text', `${Cypress.env('USER_ROLE')}`)
        })

        it('User profile table contains correct user creation date', () => {
            cy.xpath('//tr[td[text()="Created"]]//td[2]').should('have.text', '17 November 2022 at 11:45 am')
        })

        it('User profile table contains correct user email', () => {
            cy.xpath('//tr[td[text()="Email"]]//td[2]').should('have.text', `${Cypress.env('EMAIL')}`)
        })
    })
})