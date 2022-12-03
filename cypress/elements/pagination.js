class Pagination {

    get paginationButtons() { return cy.get('ul.ant-pagination') }

    get activePage() { return cy.get('.ant-pagination-item-active') }

    get previousPageButton() { return cy.get('[title="Previous Page"] > button') }
    get nextPageButton() { return cy.get('[title="Next Page"] > button') }

    get itemsCounter() { return cy.get('.h-100') }
}

export default new Pagination()