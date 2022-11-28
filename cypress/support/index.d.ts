declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Creates one Todo using UI
         * @example
         * cy.auth('token', 'userId')
         */
        auth(token: string, userId: string): Chainable<any>
    }
}