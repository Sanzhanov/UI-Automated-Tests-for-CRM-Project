class Dashboard {

    get tableContent() { return cy.get('tbody.ant-table-tbody') }

}

export default new Dashboard()