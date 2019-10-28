import {Selector, t} from 'testcafe';

class SignUpPage {

    constructor() {
        this.inputFirstName = Selector('input').withAttribute('name', 'firstName');
        this.inputLastName = Selector('input').withAttribute('name', 'lastName');
        this.inputEmail = Selector('input').withAttribute('name', 'email');
        this.inputPassword = Selector('input').withAttribute('name', 'password');
        this.inputCompanyName = Selector('input').withAttribute('name', 'name');
        this.inputCompanyUrl = Selector('input').withAttribute('name', 'website');
        this.createAccountButton = Selector('div').withExactText('Create account').parent('button');
    }

    async fillUserData(userData) {
        await  t
            .typeText(this.inputFirstName, userData.firstName)
            .typeText(this.inputLastName, userData.lastName)
            .typeText(this.inputEmail, userData.email)
            .typeText(this.inputPassword, userData.password)
            .typeText(this.inputCompanyName, userData.companyName)
            .typeText(this.inputCompanyUrl, userData.companyUrl)
    }

    async clickCreateAccount() {
        await  t.click(this.createAccountButton);
    }

    async waitPageLoaded() {
        await t.expect(this.createAccountButton.exists).ok({timeout: 60000});
    }
}
export default new SignUpPage();