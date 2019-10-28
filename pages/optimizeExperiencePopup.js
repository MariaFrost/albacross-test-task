import {Selector, t} from 'testcafe';

class OptimizeExperiencePopup {

    constructor() {
        this.userDetailsBlock = Selector('div').withAttribute('class', /user-details/);
        this.firstNameInput = this.userDetailsBlock.find('input', 'firstName');
        this.lastNameInput = this.userDetailsBlock.find('input', 'lastName');
    }

    async waitPageLoaded() {
        await t.expect(this.userDetailsBlock.exists).ok({timeout: 60000});
    }
}
export default new OptimizeExperiencePopup();