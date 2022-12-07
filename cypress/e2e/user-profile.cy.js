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
           UserProfilePage.userName.should('have.text', `${Cypress.env('USER_NAME')}`)
        })

        it('User profile table contains correct company name', () => {
           UserProfilePage.companyName.should('have.text', 'Alice Inc')
        })

        it('Company name is the link to the Company account page', () => {
            UserProfilePage.companyName.click()

            cy.location('pathname').should('eq', `/v5/company/${Cypress.env('COMPANY_ID')}`)
        })

        it('User profile table contains correct user role', () => {
           UserProfilePage.userRole.should('have.text', `${Cypress.env('USER_ROLE')}`)
        })

        it('User profile table contains correct user creation date', () => {
            UserProfilePage.creationDate.should('have.text', '17 November 2022 at 11:45 am')
        })

        it.only('User profile table contains correct user email', () => {
           UserProfilePage.userEmail.should('have.text', `${Cypress.env('EMAIL')}`)
        })
    })
})