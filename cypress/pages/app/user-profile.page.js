import AppPage from "./app.page";

class UserProfilePage extends AppPage {

    open() {
        return super.open(`/v5/profile/${Cypress.env('USER_ID')}`)
    }
}

export default new UserProfilePage()