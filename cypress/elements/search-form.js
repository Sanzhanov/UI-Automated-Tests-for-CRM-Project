class searchForm {

    get form() { return cy.get('form.ant-form') }

    get buttonReset() { return cy.xpath('//button[.//*[text() = "Reset"]]')}

    searchField(value) { return cy.get(`[placeholder="${value}"]`) }

}

export default new searchForm()