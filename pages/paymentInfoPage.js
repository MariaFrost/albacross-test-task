import {Selector, t} from 'testcafe';

class PaymentInfoPage {

    constructor() {
        this.nameOnCardInput = Selector('div.credit-card-form').find('input').withAttribute('name', 'cardholder');
        this.creditCardInputFrame = Selector('#credit-card-input__stripe-card-element').find('iframe');
        this.cardNumberInput = Selector('input').withAttribute('name', 'cardnumber');
        this.cardExpDateInput = Selector('input').withAttribute('name', 'exp-date');
        this.cardCvcInput = Selector('input').withAttribute('name', 'cvc');

        this.countryAndVatForm = Selector('div').withAttribute('class', /country-and-vat/);
        this.countrySearch = this.countryAndVatForm.find('input').withAttribute('class', /select/);
        this.selectCountryMenu = this.countryAndVatForm.find('div').withAttribute('class', /select__menu/);
        this.vatInput = this.countryAndVatForm.find('input').withAttribute('name', 'vatNumber');

        this.startYouFreeTrialButton = Selector('button').withAttribute('type', 'submit');

        this.detailsSummary = Selector('div.credit-card-details-summary');
        this.subscriptionType = this.detailsSummary.find('p').withText(/subscription/);
        this.totalDueAfterTrial = this.detailsSummary.find('div').withAttribute('class', /total-due-after-trial/).find('span').nth(1);
    }

    async selectCountry(country) {
        await t.click(this.countrySearch)
            .expect(this.selectCountryMenu.exists).ok({timeout: 60000})
            .typeText(this.selectCountryMenu, country)
            .click(Selector('div').withExactText(country));
    }

    async startYourFreeTrial() {
        await  t.click(this.startYouFreeTrialButton);
    }

    async fillPaymentDetails(cardData) {
        await t
            .typeText(this.nameOnCardInput, cardData.nameOnCard, {replace: true})
            .switchToIframe(this.creditCardInputFrame)
            .typeText(this.cardNumberInput, cardData.cardNumber)
            .typeText(this.cardExpDateInput, cardData.expDate)
            .typeText(this.cardCvcInput, cardData.cvc)
            .switchToMainWindow();
        await this.selectCountry(cardData.country);
        if (await this.vatInput.exists) {
            await t.typeText(this.vatInput, cardData.vat)
        }
    }

    async getSubscriptionType() {
        return await this.subscriptionType.innerText;
    }

    async getTotalDueAfterTrial() {
        const innerText = await this.totalDueAfterTrial.innerText;
        return parseInt(innerText.substring(0, innerText.length - 1));
    }

    async waitPageLoaded() {
        await t.expect(this.nameOnCardInput.exists).ok({timeout: 60000});
    }
}
export default new PaymentInfoPage();