class ConfirmationWindow {

    get window() { return cy.get('.ant-modal-body') }
    get buttonCancel() { return cy.xpath('//button[*[text() = "Cancel"]]') }
    get buttonOk() { return cy.xpath('//button[*[text() = "OK"]]') }

}

export default new ConfirmationWindow()