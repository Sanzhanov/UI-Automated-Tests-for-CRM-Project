import BasePage from "./base.page";

class RegistrationPage extends BasePage {

    get mainSign() { return cy.xpath('//h4[text() = "Create an account as a business owner"]')}

    get fieldCompanyName() { return cy.get('#user_login_companyName') }
    get fieldFirstName() { return cy.get('#user_login_firstName') }
    get fieldLastName() { return cy.get('#user_login_lastName') }
    get fieldEmail() { return cy.get('#user_login_email') }
    get fieldPassword() { return cy.get('#user_login_password') }
    get buttonRegister() { return cy.get('button[type="submit"]') }

    get toastError() { return cy.xpath('//div[text() = "User with this e-mail exists"]')}

    get emailValidationSign() { return cy.xpath('//div[text() = "Email is not valid email"]') }

    get prescription() { return cy.xpath('//p[text() = "Already have an account? Just click "]') }
    get prescriptionLink() { return cy.xpath('//a[text() = "Log in"]')}

    open() {
        return super.open('/v5/user/register')
    }

    userRegister(companyName, firstName, lastName, email, password) {
        this.fieldCompanyName.type(companyName)
        this.fieldFirstName.type(firstName)
        this.fieldLastName.type(lastName)
        this.fieldEmail.type(email)
        this.fieldPassword.type(password)
        this.buttonRegister.click()
    }
 }

export default new RegistrationPage()