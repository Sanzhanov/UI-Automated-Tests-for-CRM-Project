import LoginPage from "../pages/login.page";
import AppPage from "../pages/app/app.page";
import MainPage from "../pages/app/main.page";

describe('User log in', () => {

    beforeEach(() => {
        LoginPage.open()
    })

    describe('Credentials validation', () => {

        it('Email field validation', () => {
            LoginPage.emailField.type('test')
            LoginPage.emailValidationSign.should('have.text', 'Email is not valid email')
        })

        it('Input email is required', () => {
            LoginPage.emailField.type('test').clear()
            LoginPage.emailValidationSign.should('have.text', 'Required')

        })

        it('Input password is required', () => {
            LoginPage.passwordField.type('test').clear()
            LoginPage.passwordValidationSign.should('have.text', 'Required')
        })
    })

    describe('Log in with valid credentials', () => {
        beforeEach(() => {
            LoginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
            cy.wait(500)
        })

        it('Url checking', () => {
            cy.location('pathname').should('eq', '/v5/client')
            cy.location('pathname').should('include', '/client')
            cy.location('hash').should('eq', '')
            cy.location('href').should('eq', 'https://clientbase.us/v5/client')
            cy.location('host').should('eq', 'clientbase.us')
            cy.location('hostname').should('eq', 'clientbase.us')
            cy.location('origin').should('eq', 'https://clientbase.us')
            cy.location('port').should('eq', '')
            cy.location('protocol').should('eq', 'https:')
            cy.location('search').should('eq', '')
            cy.location('superDomain').should('eq', 'clientbase.us')
            cy.location('superDomainOrigin').should('eq', 'https://clientbase.us')

            cy.url().should('eq', 'https://clientbase.us/v5/client')
            cy.url().should('eq', Cypress.config().baseUrl + '/v5/client')
            cy.url().should('include', '/client')
            cy.url().should('contain', '/client')
        })

        it('The sign \'Company Sales\' on the Main page becomes visible', () => {
            MainPage.open()
            MainPage.companySalesSign.should('be.visible')
        })
    })

    describe('Log in with invalid credentials', () => {
        beforeEach(() => {
            LoginPage.login(Cypress.env('EMAIL'), '123456')
        })

        it('The toast with text \'Auth failed\' appears', () => {
            LoginPage.toast.should('be.visible').should('have.text', 'Auth failed')
            LoginPage.toast.should('contain.text', 'failed')
        })

        it('User can\'t log in if email field is empty', () => {
            LoginPage.emailField.type(`${Cypress.env('EMAIL')}`).clear()
            LoginPage.passwordField.type(`${Cypress.env('PASSWORD')}`)

            LoginPage.buttonLogIn.should('be.disabled')
        })

        it('User can\'t log in if password field is empty', () => {
            LoginPage.emailField.type(`${Cypress.env('EMAIL')}`)
            LoginPage.passwordField.type(`${Cypress.env('PASSWORD')}`).clear()

            LoginPage.buttonLogIn.should('be.disabled')
        })

        it('User can\'t log in if both email and password fields are empty', () => {
            LoginPage.emailField.type(`${Cypress.env('EMAIL')}`)
            LoginPage.passwordField.type(`${Cypress.env('PASSWORD')}`)
            LoginPage.emailField.clear()
            LoginPage.passwordField.clear()

            LoginPage.buttonLogIn.should('be.disabled')
        })
    })
})