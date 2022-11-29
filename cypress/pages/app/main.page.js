import AppPage from "./app.page";

class MainPage extends AppPage {

    get mainSign() { return cy.xpath('//h1[text()]') }
    get description() { return cy.get('.mt-4.mb-5') }

    get tabLogin() { return cy.get('[data-qa="login"]') }
    get tabGetStarted() { return cy.get('[data-qa="register"]') }


    get companySalesSign() { return cy.xpath('//h3[text() = "Company Sales"]') }
    get personalSalesSign() { return cy.xpath('//h3[text() = "Personal Sales"]') }

    open() {
        return super.open(`/v5`)
    }
}

export default new MainPage()