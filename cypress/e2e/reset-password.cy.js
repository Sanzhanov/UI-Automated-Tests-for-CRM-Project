import ResetPasswordPage from "../pages/reset-password.page";
import LoginPage from "../pages/login.page";
import faker from "faker";

describe('Reset Password page', () => {

    beforeEach(() => {
        ResetPasswordPage.open()
    })

    describe('SMOKE', () => {
        describe('Reset password with valid credentials (for already registered user)', () => {
            beforeEach(() => {
                ResetPasswordPage.resetPassword(Cypress.env('EMAIL'))
            })

            it('User is redirected to the reset password confirmation page', () => {
                cy.url().should('include', '/v5/user/password/reset/mailed')
            })
        })

        describe('Reset password with invalid credentials (for unregistered user)', () => {
            beforeEach(() => {
                const email = faker.internet.email()
                ResetPasswordPage.resetPassword(email)
            })

            it('Error toast appears', () => {
               ResetPasswordPage.toastError.should('be.visible')
            })
        })
    })

    describe('Page content', () => {

        it('Main sign exists on the page', () => {
            ResetPasswordPage.mainSign.should('be.visible').should('have.text', 'Reset password')
        })

        it('Direction sign exists on the page', () => {
            ResetPasswordPage.direction.should('be.visible').should('have.text', 'Enter your account’s email address and we will send you a link to reset your password.')
        })

        it('Prescription exists on the page', () => {
            ResetPasswordPage.prescription.should('be.visible').should('have.text', 'Remembered your password? Login.')
        })

        it('Prescription contains link which redirects to the Login page', () => {
            ResetPasswordPage.prescriptionLink.click()
            cy.url().should('include', `/v5/user/login`)
            LoginPage.mainSign.should('be.visible').should('have.text', 'Welcome back!')
        })
    })
})