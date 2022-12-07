const users = {
    testUserValid: {
         companyName: cy.faker.company.companyName(),
         firstName: cy.faker.name.firstName(),
         lastName: cy.faker.name.lastName(),
         email: cy.faker.internet.email(),
         password: cy.faker.internet.password()
    },
    testUserInvalid: {
        companyName: cy.faker.company.companyName(),
        firstName: cy.faker.name.firstName(),
        lastName: cy.faker.name.lastName(),
        email: cy.faker.internet.password(),
        password: cy.faker.internet.email()
    }
}
module.exports = users