class Dropdown {

    get userNameDropdown() { return cy.get('[data-qa="userInfoName"]') }
    get dropdownMenu() { return cy.get('ul.ant-dropdown-menu') }
    get dropdownTabProfile() { return cy.get('[data-qa="profile"]') }
    get dropdownTabCompany() { return cy.get('[data-qa="company"]') }
    get dropdownTabLogout() { return cy.get('[data-qa="logout"]') }

    openUserNameDropdown() {
        return this.userNameDropdown.click()
    }

    openDropdownTabProfile() {
        return this.dropdownTabProfile.click()
    }

    openDropdownTabCompany() {
        return this.dropdownTabCompany.click()
    }

    openDropdownTabLogout() {
        return this.dropdownTabLogout.click()
    }
}

export default new Dropdown()