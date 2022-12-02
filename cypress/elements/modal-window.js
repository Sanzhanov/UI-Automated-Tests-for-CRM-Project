class ModalWindow {

    get mainSign() { return cy.get('.ant-drawer-title') }

    get markClose() { return cy.get('button[aria-label="Close"]') }

    get creatingForm() { return cy.get('.ant-form.ant-form-vertical') }

    get buttonSubmit() { return cy.get('button[type="submit"]') }

    field(text, id) { return cy.xpath(`//*[contains(@class, "ant-row")][.//text() = "${text}"]//*[@id = "${id}"]`) }

    create(name, phone) {
        this.field("Full Name", "name").type(name)
        this.field("Phone", "phone").type(phone)
        this.buttonSubmit.click()
    }

    fieldValidationSign(title, text) { return cy.xpath(`//*[@title="${title}"]/../..//*[text()="${text}"]`) }

}

export default new ModalWindow()