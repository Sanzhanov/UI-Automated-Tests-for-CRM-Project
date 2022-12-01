import ClientPage from "../pages/app/client.page";
import faker from "faker";
import {fa} from "faker/lib/locales";

describe('Clients page', () => {

    beforeEach(() => {
        cy.auth(Cypress.env('TOKEN'), Cypress.env('USER_ID'))
        ClientPage.open()
    })

    describe('SMOKE', () => {
        it('Authorized user is able to open Clients Modal window', () => {
            ClientPage.buttonCreateClient.click()

            ClientPage.modalWindow.creatingForm.should('be.visible')
            ClientPage.modalWindow.mainSign.should('be.visible').should('have.text', 'Create Client')

            ClientPage.modalWindow.markClose.click()
        })
    })

    describe('Search form', () => {

        it('Search form exists on the page', () => {
            ClientPage.searchForm.form.should('be.visible')
        })

        it('Search field \'Name\' exists on the page and has corresponding placeholder', () => {
            ClientPage.searchForm.searchField('Name').should('be.visible').should('have.attr', 'placeholder', 'Name')
        })

        it('Search field \'Email\' exists on the page and has corresponding placeholder', () => {
            ClientPage.searchForm.searchField('Email').should('be.visible').should('have.attr', 'placeholder', 'Email')
        })

        it('Search field \'Phone\' exists on the page and has corresponding placeholder', () => {
            ClientPage.searchForm.searchField('Phone').should('be.visible').should('have.attr', 'placeholder', 'Phone')
        })

        it('Clicking on reset button clears all search fields', () => {
            ClientPage.searchForm.searchField('Name').type(faker.company.companyName())
            ClientPage.searchForm.searchField('Email').type(faker.internet.email())
            ClientPage.searchForm.searchField('Phone').type(faker.phone.phoneNumberFormat())
            ClientPage.searchForm.buttonReset.click()

            ClientPage.searchForm.searchField('Name').should('be.empty')
            ClientPage.searchForm.searchField('Email').should('be.empty')
            ClientPage.searchForm.searchField('Phone').should('be.empty')
        })

        it.only('Search by Name occurs automatically as user type characters in the field', () => {
            const name = faker.company.companyName()
            const phone = faker.phone.phoneNumberFormat()

            ClientPage.openModalWindow()
            ClientPage.createClient(name, phone)

            ClientPage.searchForm.searchField('Name').type(name)
            cy.wait(1000)
            expect(cy.get('tbody.ant-table-tbody').find('a[href]').eq(0)).to.eq.name
        })

        it('The page reloads automatically as user type characters in the field', () => {
            const name = faker.company.companyName()
            let namePart = ''

            for (let i = 0; i < name.length; i++) {
                ClientPage.searchForm.searchField('Name').type(name[i])
                cy.wait(1000)

                if (name[i] === ' ') namePart += '+'
                else namePart += name[i]

                cy.url().should('include', `name=${namePart}`)
            }
            ClientPage.searchForm.buttonReset.click()
        })


    })


})