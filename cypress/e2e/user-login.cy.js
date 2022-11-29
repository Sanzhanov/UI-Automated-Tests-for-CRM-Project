import LoginPage from "../pages/login.page";
import MainPage from "../pages/app/main.page";

describe('Login page', () => {

    beforeEach(() => {
        LoginPage.open()
    })

    describe('SMOKE', () => {
            describe('Log in with valid credentials', () => {
            beforeEach(() => {
                LoginPage.login(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
                cy.wait(500)
            })

            it('Authorized user is automatically redirected to the Client page', () => {
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

            it('The sign \'Company Sales\' on the Main page becomes visible for authorized user', () => {
                MainPage.open()
                MainPage.companySalesSign.should('be.visible')
            })
        })

        describe('Log in with invalid credentials', () => {

            it('The toast with text \'Auth failed\' appears', () => {
                LoginPage.login(Cypress.env('EMAIL'), '123456')

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

    describe('Page content', () => {

        it('Main sign contains text \'Welcome back!\'', () => {
            LoginPage.mainSign.should('be.visible').should('contain.text', 'Welcome back!')
        })

        it('Prescription \'Don’t have an account? Create one.\' exists on the page and contains link which redirects to the user registration page', () => {
            LoginPage.prescriptionAccount.should('be.visible')

            LoginPage.prescriptionAccountLink.click()
            cy.url().should('include', `/v5/user/register`)
        })

        it('Prescription \'Forgot your password? Reset it.\' exists on the page and contains link which redirects to the Reset password page', () => {
            LoginPage.prescriptionPassword.should('be.visible')

            LoginPage.prescriptionPasswordLink.click()
            cy.url().should('include', `/v5/user/password/reset/request`)
        })
    })
})