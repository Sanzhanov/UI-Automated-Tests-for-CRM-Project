class Navbar {

    get tabClients() { return cy.get('#top-menu > div [href ="/v5/client"]') }
    get tabOrders() { return cy.get('#top-menu > div [href ="/v5/order"]') }
    get tabVendors() { return cy.get('#top-menu > div [href ="/v5/vendor"]') }
    get tabServices() { return cy.get('#top-menu > div [href ="/v5/service"]') }

    openTabClients() {
        return this.tabClients.click()
    }

    openTabOrders() {
        return this.tabOrders.click()
    }

    openTabVendors() {
        return this.tabVendors.click()
    }

    openTabServices() {
        return this.tabServices.click()
    }

}

export default new Navbar()