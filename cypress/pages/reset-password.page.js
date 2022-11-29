import BasePage from "./base.page";

class ResetPasswordPage extends BasePage {

    get mainSign() { return cy.get('#user_password_reset > h1') }
    get direction() { return cy.xpath('//*[@id="user_password_reset"]/p[1]') }

    get fieldEmail() { return cy.get('#user_password_reset_email') }
    get buttonSendLink() { return cy.get('button[type="submit"]') }
    get toastError() { return cy.get('.ant-notification-notice-message')}

    get prescription() { return cy.xpath('//*[@id="user_password_reset"]/p[2]') }
    get prescriptionLink() { return cy.xpath('//*[@id="user_password_reset"]//a') }

    open() {
        return super.open('/v5/user/password/reset/request')
    }

    resetPassword(email) {
        this.fieldEmail.type(email)
        this.buttonSendLink.click()
    }
}

export default new ResetPasswordPage()