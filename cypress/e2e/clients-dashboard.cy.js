import ClientPage from "../pages/app/client.page";
import ModalWindow from "../elements/modal-window";
import Dashboard from "../elements/dashboard";
import ClientCardPage from "../pages/app/client-card.page";
import EllipsisMenu from "../elements/ellipsis-menu";
import ConfirmationWindow from "../elements/confirmation-window";

describe('Clients page', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    describe('SMOKE', () => {
        it('Authorized user is able to open Clients Modal window', () => {
            ClientPage.buttonCreateClient.click()

            ModalWindow.creatingForm.should('be.visible')
            ModalWindow.mainSign.should('be.visible').should('have.text', 'Create Client')

            ModalWindow.markClose.click()
        })
    })

    describe('Clients dashboard', () => {

        it('Dashboard contains 20 items on the page by default', () => {
            //the first way
            Dashboard.tableContent.find('a[href]').its('length').should('eq', 20)
            //the second way
            Dashboard.tableContent
                .find('a[href]')
                .then(items => {
                    const itemCount = Cypress.$(items).length;
                    cy.log(`**Dashboard contains ${itemCount} items on the page**`)
                    expect(itemCount).to.eq(20, 'Assertion is true')
                });
        })

        it('Client names are the links', () => {
            cy.url().then(url => {
                Dashboard.tableContent.find('a[href]').eq(0).click()
                cy.url().should('not.eq', url);
            });
        })

        it('Clicking on the client names opens the pages with their cards', () => {
            Dashboard.tableContent.find('a[href]').eq(0).invoke('text').as('companyName')
            Dashboard.tableContent.find('td').eq(1).invoke('text').as('phone')

            cy.get('@companyName').then((companyName) => {
                cy.get('@phone').then((phone) => {
                    cy.intercept('GET', '/v5/client/*').as('clientCardUpload');
                    Dashboard.tableContent.find('a[href]').eq(0).click()
                    cy.wait('@clientCardUpload')
                    ClientCardPage.clientName.invoke('text').as('clientName')
                    ClientCardPage.clientPhone.invoke('text').as('clientPhone')

                    cy.get('@clientName').then((clientName) => {
                        expect(clientName).to.eq(companyName, '**Client name verification successful**')
                    })
                    cy.get('@clientPhone').then((clientPhone) => {
                        expect(clientPhone).to.eq(phone, '**Phone verification successful**')
                    })
                })
            })
        })

        it('Clients dashboard contains correct column names', () => {

            const columns = ['Name', 'Phone', 'Email', 'Client Paid', 'Client Debt', 'Profit Actual', 'Profit Plan', 'Description', 'Actions']
            for (let i = 0; i < columns.length; i++) {
                cy.get('thead.ant-table-thead > tr').find('th').eq(i).invoke('text').then((text) => {
                    expect(text).to.eq(columns[i])
                })
            }
        })

        describe('Ellipsis menu', () => {

            it('Mouseover on ellipsis opens dropdown menu', () => {
                EllipsisMenu.ellipsis.trigger("mouseover")
                EllipsisMenu.menu.should('be.visible')
            })

            it('Clicking on button \'Edit\' opens Modal window', () => {
                EllipsisMenu.ellipsis.trigger("mouseover")
                EllipsisMenu.buttonEdit.click()

                ModalWindow.creatingForm.should('be.visible')
                ModalWindow.mainSign.should('be.visible').should('have.text', 'Edit Client')

                ModalWindow.markClose.click()
            })

            it('Clicking on button \'Delete\' opens additional confirmation window', () => {
                EllipsisMenu.ellipsis.trigger("mouseover")
                EllipsisMenu.buttonDelete.click()

                ConfirmationWindow.window.should('be.visible')
            })

            it('Clicking on button \'Cancel\' in confirmation window closes this window', () => {
                EllipsisMenu.ellipsis.trigger("mouseover")
                EllipsisMenu.buttonDelete.click()
                ConfirmationWindow.buttonCancel.click()

                ConfirmationWindow.window.should('not.exist')
            })

            it('Clicking on btn \'Ok\' in confirmation window deletes corresponding client', () => {
                cy.intercept('POST', '/v5/client/search').as('dataLoading');
                cy.wait('@dataLoading')

                Dashboard.tableContent.find('td').eq(0).invoke('text').as('clientBefore')
                cy.get('@clientBefore').then((clientBefore) => {
                    EllipsisMenu.ellipsis.trigger("mouseover")
                    EllipsisMenu.buttonDelete.click()

                    cy.intercept('POST', '/v5/client/*').as('deleted');
                    ConfirmationWindow.buttonOk.click()
                    cy.wait('@deleted')

                    Dashboard.tableContent.find('td').eq(0).invoke('text').as('clientAfter')
                    cy.get('@clientAfter').then((clientAfter) => {
                        expect(clientAfter).not.to.eq(clientBefore, '**Client names don\'t match**')
                    })
                })
            })
        })
    })
})