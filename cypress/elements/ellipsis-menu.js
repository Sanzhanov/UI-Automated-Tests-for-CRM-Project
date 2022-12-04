class EllipsisMenu {

    get ellipsis() { return cy.get('#action-menu') }

    get menu() { return cy.xpath('(//*[@data-menu-list="true"])[1]') }
    get buttonEdit() { return cy.xpath('//li[*[text()="Edit"]]') }
    get buttonDelete() { return cy.xpath('//li[*[text()="Delete"]]') }

}

export default new EllipsisMenu()