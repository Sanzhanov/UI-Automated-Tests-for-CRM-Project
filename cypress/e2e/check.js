const faker = require('faker');

const Name1 = faker.company.companyName()
const Phone1 = faker.phone.phoneNumberFormat()
const Email1 = faker.internet.email()
const Description1 = faker.lorem.paragraph()

console.log(Description1)