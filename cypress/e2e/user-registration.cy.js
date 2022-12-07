import RegistrationPage from "../pages/registration.page";
import { testUserValid } from "../fixtures/users"
import { testUserInvalid } from "../fixtures/users"
import OnboardingPage from "../pages/onboarding.page";
import LoginPage from "../pages/login.page";

describe('SMOKE', () => {
    const companyName = testUserValid.companyName
    const firstName = testUserValid.firstName
    const lastName = testUserValid.lastName
    const email = testUserValid.email
    const password = testUserValid.password

    describe('New user registration with valid credentials', () => {
        before(() => {
            RegistrationPage.open()
            RegistrationPage.userRegister(companyName, firstName, lastName, email, password)
        })

        it('After registration user is redirected to the onboarding page', () => {
            cy.url().should('include', `/v5/onboarding`)
            OnboardingPage.onboardingSign.should('be.visible').should('contain.text', `We sent you confirmation email to`)
        })
    })

    describe('User registration with already registered Email', () => {
        before(() => {
            RegistrationPage.open()
            RegistrationPage.userRegister(companyName, firstName, lastName, email, password)
        })

        it('Error toast \'User with this e-mail exists\' appears', () => {
            RegistrationPage.toastError.should('be.visible')
        })

        it('User isn\'t redirected to the onboarding page', () => {
            cy.url().should('not.include', `/v5/onboarding`)
        })
    })

    describe('User registration with invalid credentials', () => {
        beforeEach(() => {
            const companyName = testUserInvalid.companyName
            const firstName = testUserInvalid.firstName
            const lastName = testUserInvalid.lastName
            const email = testUserInvalid.email
            const password = testUserInvalid.password

            RegistrationPage.open()
            RegistrationPage.fieldCompanyName.type(companyName)
            RegistrationPage.fieldFirstName.type(firstName)
            RegistrationPage.fieldLastName.type(lastName)
            RegistrationPage.fieldEmail.type(email)
            RegistrationPage.fieldPassword.type(password)
            cy.wait(500)
        })

        it('Error sign under email field appears', () => {
            RegistrationPage.emailValidationSign.should('be.visible').should('have.text', 'Email is not valid email')
        })

        it('Register button is disabled', () => {
            RegistrationPage.buttonRegister.should('be.disabled')
        })
    })
})

describe('Page content', () => {
    beforeEach(() => {
        RegistrationPage.open()
    })

    it('Endpoint after page load is correct endpoint', () => {
        cy.url().should('include', `/v5/user/register`)
    })

    it('Registration page contains correct main sign', () => {
        RegistrationPage.mainSign.should('be.visible').should('have.text', 'Create an account as a business owner')
    })

    it('Prescription exists on the page', () => {
        RegistrationPage.prescription.should('be.visible').should('have.text', 'Already have an account? Just click Log in.')
    })

    it('Prescription contains link which redirects to the Login page', () => {
        RegistrationPage.prescriptionLink.click()
        cy.url().should('include', `/v5/user/login`)
        LoginPage.mainSign.should('be.visible').should('have.text', 'Welcome back!')
    })
})

