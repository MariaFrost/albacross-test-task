import {Selector, t} from 'testcafe';

class LoginPage {

    constructor() {
        this.createAnAccountButton = Selector('a').withExactText('Create an account');
        this.emailInput = Selector('input').withAttribute('name', 'email');
        this.passwordInput = Selector('input').withAttribute('name', 'password');
        this.loginButton = Selector('button').withAttribute('type', 'submit');
    }

    async logIn(email, password) {
        await t
            .typeText(this.emailInput, email)
            .typeText(this.passwordInput, password)
            .click(this.loginButton);
    }

    async waitPageLoaded() {
        await t.expect(this.loginButton.exists).ok({timeout: 60000});
    }

    async openPlanChooser() {
        await t
            .click(this.createAnAccountButton)
    }
}
export default new LoginPage();