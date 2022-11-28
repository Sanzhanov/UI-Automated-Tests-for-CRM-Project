import AppPage from "./app.page";

class ClientPage extends AppPage {

    get buttonCreateClient() { return cy.get('[type="button"][class="ant-btn ant-btn-primary"]') }
    get buttonSubmit() { return cy.get('button[type="submit"]') }

    get fieldClientFullName() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Full Name"]//*[@id="name"]') }
    get fieldClientPhone() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Phone"]//*[@id="phone"]') }
    get fieldClientEmail() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Email"]//*[@id="email"]') }
    get fieldClientDescription() { return cy.xpath('//*[contains(@class, "ant-row")][.//text() = "Description"]//*[@id="description"]') }

    get createClientForm() { return cy.get('.ant-form.ant-form-vertical') }
    get createClientSign() { return cy.get('.ant-drawer-title') }


    open() {
        return super.open('/v5/client')
    }

    openModalWindow() {
        this.buttonCreateClient.click()
    }

    createClient(name, phone, email, description ) {
        this.fieldClientFullName.type(name)
        this.fieldClientPhone.type(phone)
        this.fieldClientEmail.type(email)
        this.fieldClientDescription.type(description)
        this.buttonSubmit.click()
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