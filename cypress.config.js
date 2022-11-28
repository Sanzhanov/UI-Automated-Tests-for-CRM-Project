const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://clientbase.us',
        excludeSpecPattern: ['cypress/e2e/1-getting-started/*.cy.js', 'cypress/e2e/2-advanced-examples/*.cy.js'],
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    component: {}
});
