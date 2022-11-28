import MainPage from "../pages/app/main.page";

beforeEach(() => {
    cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
})

describe('LOGO', () => {

    it('Logo is \'Client Base v5\'', () => {
        MainPage.logo.mainLabel.should('have.text', 'ClientBase v5')
    })

    it('Logo opens the main page', () => {
        MainPage.logo.openMainLabel()
        cy.url().should('eq', Cypress.config().baseUrl + '/v5')
    })
})

describe('NAVBAR', () => {

    describe('Tab Clients', () => {
        it('Tab \'Clients\' exists', () => {
            MainPage.navbar.tabClients.should('be.visible').should('have.text', 'Clients')
        })

        it('Tab \'Clients\' opens the Clients page', () => {
            MainPage.navbar.openTabClients()
            cy.location('pathname').should('eq', '/v5/client')
        })
    })

    describe('Tab Orders', () => {
        it('Tab \'Orders\' exists', () => {
            MainPage.navbar.tabOrders.should('be.visible').should('have.text', 'Orders')
        })

        it('Tab \'Orders\' opens the Orders page', () => {
            MainPage.navbar.openTabOrders()
            cy.location('pathname').should('eq', '/v5/order')
        })
    })

    describe('Tab Vendors', () => {
        it('Tab \'Vendors\' exists', () => {
            MainPage.navbar.tabVendors.should('be.visible').should('have.text', 'Vendors')
        })

        it('Tab \'Vendors\' opens the Vendors page', () => {
            MainPage.navbar.openTabVendors()
            cy.location('pathname').should('eq', '/v5/vendor')
        })
    })

    describe('Tab Services', () => {
        it('Tab \'Services\' exists', () => {
            MainPage.navbar.tabServices.should('be.visible').should('have.text', 'Services')
        })

        it('Tab \'Services\' opens the Services page', () => {
            MainPage.navbar.openTabServices()
            cy.location('pathname').should('eq', '/v5/service')
        })
    })
})

describe('USER NAME DROPDOWN', () => {

    beforeEach(() => {
        MainPage.dropdown.openUserNameDropdown()
    })

    it('The page contains user name which is dropdown', () => {
        MainPage.dropdown.userNameDropdown.should('be.visible').should('have.text', `${Cypress.env('USER_NAME')}`)
    })

    it('Dropdown menu opens bu clicking on user name', () => {
        MainPage.dropdown.dropdownMenu.should('be.visible')
    })

    it('Dropdown menu contains tab \'Profile\' which opens the user-profile page', () => {
        MainPage.dropdown.dropdownTabProfile.should('have.text', 'Profile')

        MainPage.dropdown.openDropdownTabProfile()
        cy.url().should('include', `/v5/profile/${Cypress.env('USER_ID')}`)
    })

    it('Dropdown menu contains tab \'Company\' which opens the company account page', () => {
        MainPage.dropdown.dropdownTabCompany.should('have.text', 'Company')

        MainPage.dropdown.openDropdownTabCompany()
        cy.location('pathname').should('eq', `/v5/company/${Cypress.env('COMPANY_ID')}`)
    })

    it('Dropdown menu contains tab \'Log out\' which opens the Login page', () => {
        MainPage.dropdown.dropdownTabLogout.should('have.text', 'Log out')

        MainPage.dropdown.openDropdownTabLogout()
        cy.location('pathname').should('eq', '/v5/user/login')
    })
})