
const clients = {
    testClientValid: {
        companyName: cy.faker.company.companyName(),
        phone: cy.faker.phone.phoneNumber('###-###-####'),
        email: cy.faker.internet.email(),
        description: cy.faker.lorem.sentence()
    }
}
module.exports = clients