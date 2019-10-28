import {Selector, t} from 'testcafe';

class PlanChooserPage {

    constructor() {
        this.monthlyOrAnnualSlider = Selector('span').withAttribute('class', /slider/);
        this.startBusinessTrialButton = Selector('div.business-product').find('a.price-button--submit');
        this.businessTrialPrice = Selector('div.business-product').find('p.price');
        this.startPremiumTrialButton = Selector('div.premium-product').find('a.price-button--submit');
        this.chosenPaymentMode = Selector('label.switch').sibling('span.switch-text-active');
    }

    paymentModes = {
        MONTHLY: 'Monthly',
        ANNUAL: 'Annual'
    };

    async togglePaymentMode(paymentMode) {
        if (await this.chosenPaymentMode.innerText !== paymentMode)
            await t.click(this.monthlyOrAnnualSlider);
    }

    async getCurrentPriceForBusinessProduct() {
        const innerText = await this.businessTrialPrice.innerText;
        return innerText.substring(0, innerText.length - 1);
    }

    async getCurrentCurrencyFoBusinessProduct() {
        const innerText = await this.businessTrialPrice.innerText;
        return innerText.substring(innerText.length - 1);
    }

    async startBusinessTrial() {
        await t.click(this.startBusinessTrialButton);
    }

    async startPremiumTrial() {
        await t.click(this.startPremiumTrialButton);
    }

    async waitPageLoaded() {
        await t.expect(this.monthlyOrAnnualSlider.exists).ok({timeout: 60000});
    }
}
export default new PlanChooserPage();