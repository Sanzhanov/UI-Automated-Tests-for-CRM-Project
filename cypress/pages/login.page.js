import BasePage from "./base.page";

class LoginPage extends BasePage {
    get emailField() { return cy.get('#normal_login_email') }
    get passwordField() { return cy.get('#normal_login_password') }
    get buttonLogIn() { return cy.get('.login-form-button') }
    get toast() { return cy.get('.ant-notification-notice-message') }
    get emailValidationSign() { return cy.xpath('//*[contains(@class, "ant-form-item-control")][.//*[@id="normal_login_email"]]//text()') }
    get passwordValidationSign() { return cy.xpath('//*[contains(@class, "ant-form-item-control")][.//*[@id="normal_login_password"]]//text()') }

    get mainSign() { return cy.xpath('//h1[text()]') }

    get prescriptionAccount() { return cy.xpath('//p[text() = "Don’t have an account? "]') }
    get prescriptionAccountLink() { return cy.xpath('//a[text() = "Create one"]') }
    get prescriptionPassword() { return cy.xpath('//p[text() = "Forgot your password? "]')}
    get prescriptionPasswordLink() { return cy.xpath('//a[text() = "Reset it"]')}


    open() {
        return super.open('/v5/user/login')
    }

    login(email, password) {
        this.emailField.type(email)
        this.passwordField.type(password)
        this.buttonLogIn.click()
    }

}
export default new LoginPage()