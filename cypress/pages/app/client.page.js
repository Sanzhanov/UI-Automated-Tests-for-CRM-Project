import AppPage from "./app.page";

class ClientPage extends AppPage {

    get buttonCreateClient() { return cy.get('[type="button"][class="ant-btn ant-btn-primary"]') }

    get fieldClientFullName() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Full Name"]//*[@id="name"]') }
    get fieldClientPhone() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Phone"]//*[@id="phone"]') }
    get fieldClientEmail() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Email"]//*[@id="email"]') }
    get fieldClientDescription() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Description"]//*[@id="description"]') }

    get nameValidationSign() { return cy.xpath('//*[@title="Full Name"]/../..//*[text()="Required"]') }
    get phoneValidationSign() { return cy.xpath('//*[@title="Phone"]/../..//*[text()="Required"]')}

    open() {
        return super.open('/v5/client')
    }

    openModalWindow() {
        this.buttonCreateClient.click()
    }

    createClient(name, phone) {
        this.fieldClientFullName.type(name)
        this.fieldClientPhone.type(phone)
        // this.fieldClientEmail.type(email)
        // this.fieldClientDescription.type(description)
        this.modalWindow.buttonSubmit.click()
    }

    clientDashboardName(name) {
        return cy.xpath(`//a[text() = "${name}"]`)
    }

    clientDashboardPhone(phone) {
        return cy.xpath(`//td[text() = "${phone}"]`)
    }

    clientDashboardEmail(email) {
        return cy.xpath(`//td[text() = "${email}"]`)
    }

    clientDashboardDescription(description) {
        return cy.xpath(`//td[text() = "${description}"]`)
    }
}

export default new ClientPage()