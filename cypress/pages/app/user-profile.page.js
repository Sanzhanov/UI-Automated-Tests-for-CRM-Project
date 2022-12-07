import AppPage from "./app.page";

class UserProfilePage extends AppPage {

    get userName() { return cy.xpath('//h1[.]') }
    get companyName() { return cy.xpath('//td[.="Company"]/..//a') }
    get userRole() { return cy.xpath('//td[.="Roles"]/..//td[2]') }
    get creationDate() { return cy.xpath('//td[.="Created"]/..//td[2]') }
    get userEmail() { return cy.xpath('//td[.="Email"]/..//td[2]')}

    open() {
        return super.open(`/v5/profile/${Cypress.env('USER_ID')}`)
    }
}

export default new UserProfilePage()