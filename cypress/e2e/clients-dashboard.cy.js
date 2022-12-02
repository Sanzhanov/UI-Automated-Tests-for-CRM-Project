import ClientPage from "../pages/app/client.page";
import faker from "faker";
import ModalWindow from "../elements/modal-window";
import SearchForm from "../elements/search-form";
import Dashboard from "../elements/dashboard";

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

    describe('Search form', () => {

        it('Search form exists on the page under navbar', () => {
            SearchForm.form.should('be.visible')
        })

        it('Search field \'Name\' exists on the page and has corresponding placeholder', () => {
            SearchForm.searchField('Name').should('be.visible').should('have.attr', 'placeholder', 'Name')
        })

        it('Search field \'Email\' exists on the page and has corresponding placeholder', () => {
            SearchForm.searchField('Email').should('be.visible').should('have.attr', 'placeholder', 'Email')
        })

        it('Search field \'Phone\' exists on the page and has corresponding placeholder', () => {
            SearchForm.searchField('Phone').should('be.visible').should('have.attr', 'placeholder', 'Phone')
        })

        it('Clicking on reset button clears all search fields', () => {
            SearchForm.searchField('Name').type(faker.company.companyName())
            SearchForm.searchField('Email').type(faker.internet.email())
            SearchForm.searchField('Phone').type(faker.phone.phoneNumberFormat())
            SearchForm.buttonReset.click()

            SearchForm.searchField('Name').should('be.empty')
            SearchForm.searchField('Email').should('be.empty')
            SearchForm.searchField('Phone').should('be.empty')
        })

        it('Search by Name works correctly', () => {
            const partOfName = 'LLC'

            SearchForm.searchField('Name').type(partOfName)
                .then(() => {
                    cy.wait(1000)

                    Dashboard.tableContent
                        .then((body) => {
                            if (body.find('a[href]').length > 0) {
                                Dashboard.tableContent.find('a[href]').invoke('text').then((text) => {
                                    expect(text.toLowerCase()).to.include(partOfName.toLowerCase())
                                })
                            } else cy.log('Initial part of name not found')
                        })
                })
            SearchForm.buttonReset.click({timeout: 1000})
        })

        it('Search by Email works correctly', () => {
            const partOfEmail = '@gmail'

            SearchForm.searchField('Email').type(partOfEmail)
                .then(() => {
                    cy.wait(1000)

                    Dashboard.tableContent
                        .then((body) => {
                            if (body.find('td').length > 0) {
                                Dashboard.tableContent.find('td').invoke('text').then((text) => {
                                    text !== 'No Data' ? expect(text).to.include(partOfEmail) : cy.log('Initial part of email not found')
                                })
                            }
                        })
                })
            SearchForm.buttonReset.click({timeout: 1000})
        })

        it('Search by Phone works correctly', () => {
            const partOfPhone = '54'

            SearchForm.searchField('Phone').type(partOfPhone)
                .then(() => {
                    cy.wait(1000)

                    Dashboard.tableContent
                        .then((body) => {
                            if (body.find('td').length > 0) {
                                Dashboard.tableContent.find('td').invoke('text').then((text) => {
                                    text !== 'No Data' ? expect(text).to.include(partOfPhone) : cy.log('Initial part of phone not found')
                                })
                            }
                        })
                })
            SearchForm.buttonReset.click({timeout: 1000})
        })

        it.only('The page reloads automatically as user type characters in the field', () => {
            const name = faker.company.companyName()
            let namePart = ''

            for (let i = 0; i < name.length; i++) {
                SearchForm.searchField('Name').type(name[i])
                cy.wait(1000)

                if (name[i] === ' ') namePart += '+'
                else if (name[i] === ',') namePart += '%2C'
                else namePart += name[i]

                cy.url().should('include', `name=${namePart}`)
            }
            SearchForm.buttonReset.click({timeout: 1000})
        })
    })
})