//global hook for Log In by API request to get token, user id, etc.

before(() => {
    cy.request(
        'POST',
        `${Cypress.env('API_BASE_URL')}/v5/user/login`,
        {email: Cypress.env('EMAIL'), password: Cypress.env('PASSWORD')}
    ).then((response) => {
        Cypress.env('TOKEN', response.body.payload.token)
        Cypress.env('USER_ID', response.body.payload.userId)
        Cypress.env('COMPANY_ID', response.body.payload.user.companyAccount)
        Cypress.env('USER_NAME', response.body.payload.user.name)
        Cypress.env('USER_ROLE', response.body.payload.user.roles[0])
    })
})