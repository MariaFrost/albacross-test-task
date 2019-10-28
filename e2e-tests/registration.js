import loginPage from "../pages/loginPage";
import planChooserPage from "../pages/planChooserPage";
import signUpPage from  "../pages/signUpPage";
import paymentInfoPage from "../pages/paymentInfoPage";
import optimizeExperiencePopup from "../pages/optimizeExperiencePopup";
import navTopBar from "../pages/navTopBar";
import testDataGenerator from "../utils/testDataGenerator";
import {LOGIN_URL} from "../environment/properties-e2e";

fixture('Registration Tests')
    .beforeEach(async t => {
        await t.maximizeWindow();
        await loginPage.waitPageLoaded();
    })
    .page(LOGIN_URL);

const userData = testDataGenerator.getUserData();
const cardData = testDataGenerator.getCardData();
const userDataBusiness = testDataGenerator.getUserData();

test('Basic flow', async t => {

    await loginPage.openPlanChooser();

    await planChooserPage.waitPageLoaded();
    await planChooserPage.startPremiumTrial();

    await signUpPage.waitPageLoaded();
    await signUpPage.fillUserData(userData);
    await signUpPage.clickCreateAccount();

    await paymentInfoPage.waitPageLoaded();
    await paymentInfoPage.fillPaymentDetails(cardData);
    await paymentInfoPage.startYourFreeTrial();

    await optimizeExperiencePopup.waitPageLoaded();
});

test('New user logs into app with his credentials', async t => {

    await loginPage.logIn(userData.email, userData.password);

    await navTopBar.waitPageLoaded();

    await t.expect(await navTopBar.getAccountName()).eql(userData.companyName, 'Account name is not correct');
});

test('Check registration for Annual business subscription', async t => {
    await loginPage.openPlanChooser();

    await planChooserPage.waitPageLoaded();
    await planChooserPage.togglePaymentMode(planChooserPage.paymentModes.ANNUAL);
    await t.expect(await planChooserPage.getCurrentCurrencyFoBusinessProduct()).eql('€');
    const monthPrice = await planChooserPage.getCurrentPriceForBusinessProduct();
    await planChooserPage.startBusinessTrial();

    await signUpPage.waitPageLoaded();
    await signUpPage.fillUserData(userDataBusiness);
    await signUpPage.clickCreateAccount();

    await paymentInfoPage.waitPageLoaded();
    await t.expect(await paymentInfoPage.getTotalDueAfterTrial()).eql(monthPrice * 12, 'Total due after trial is not correct');
    await t.expect(await paymentInfoPage.getSubscriptionType()).eql('Annual business subscription',
        'Type of subscription is not correct');
});