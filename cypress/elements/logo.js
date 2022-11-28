class Logo {

    get mainLabel() { return cy.get('.navbar-brand > a') }

    openMainLabel() {
        return this.mainLabel.click()
    }
}

export default new Logo()