import AppPage from "./app.page";

class MainPage extends AppPage {

    get companySalesSign() { return cy.xpath('//h3[text() = "Company Sales"]') }
    get personalSalesSign() { return cy.xpath('//h3[text() = "Personal Sales"]') }

    open() {
        return super.open(`/v5`)
    }

}

export default new MainPage()