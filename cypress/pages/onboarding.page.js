import BasePage from "./base.page";

class OnboardingPage extends BasePage {

    get onboardingSign() { return cy.get('#confirm_email > h5') }

    open() {
        return super.open('/v5/onboarding')
    }

}

export default new OnboardingPage()