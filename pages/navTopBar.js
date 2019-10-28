import {Selector, t} from 'testcafe';

class NavTopBar {
    constructor() {
        this.navAccount = Selector('div.nav-account').find('p');
    }

    getAccountName() {
        return this.navAccount.innerText;
    }

    async waitPageLoaded() {
        await t.expect(this.navAccount.exists).ok({timeout: 60000});
    }
}
export default new NavTopBar();