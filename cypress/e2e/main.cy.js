import MainPage from "../pages/app/main.page";
import LoginPage from "../pages/login.page";
import RegistrationPage from "../pages/registration.page";

describe('Main page content if user is unauthorized', function () {

    beforeEach(() => {
        MainPage.open()
    })

    it('Main sign and app description exist on the page', () => {
        MainPage.mainSign.should('be.visible').should('have.text', 'Dispatching and accounting for service companies')
        MainPage.description.should('be.visible').should('have.text', 'The easiest way to manage the process of receiving and transmitting an order.')
    })

    it('Tab Login exists on the page and contains a link to the Login page', () => {
        MainPage.tabLogin.should('be.visible')

        MainPage.tabLogin.click()
        cy.url().should('include', '/v5/user/login')
        LoginPage.mainSign.should('be.visible').should('contain.text', 'Welcome back!')
    })

    it('Tab Get Started exists on the page and contains a link to the Registration page', () => {
        MainPage.tabGetStarted.should('be.visible')

        MainPage.tabGetStarted.click()
        cy.url().should('include', '/v5/user/register')
        RegistrationPage.mainSign.should('be.visible').should('have.text', 'Create an account as a business owner')
    })
})

describe('Main page content if user is authorized', function () {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
    })

    it('Company sales and personal sales signs exist on the page', () => {
        MainPage.companySalesSign.should('be.visible').should('have.text', 'Company Sales')
        MainPage.personalSalesSign.should('be.visible').should('have.text', 'Personal Sales')
    })
})
