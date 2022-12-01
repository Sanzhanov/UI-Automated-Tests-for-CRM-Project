class ModalWindow {

    get mainSign() { return cy.get('.ant-drawer-title') }

    get markClose() { return cy.get('button[aria-label="Close"]') }

    get creatingForm() { return cy.get('.ant-form.ant-form-vertical') }

    get buttonSubmit() { return cy.get('button[type="submit"]') }

}

export default new ModalWindow()