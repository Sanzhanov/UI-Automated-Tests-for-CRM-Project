import AppPage from "./app.page";

class ClientCardPage extends AppPage {

    get clientName() { return cy.xpath('//h1[text()]') }
    get clientPhone() { return cy.xpath('//tr[td[text()="Phone"]]//td[2]')}
}

export default new ClientCardPage()