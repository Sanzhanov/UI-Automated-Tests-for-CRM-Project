export default class BasePage {

    open(path){
        return cy.visit(path)
    }
}