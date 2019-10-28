class TestDataGenerator {

    countries = [
        'Belgium',
        'Albania',
        'Austria'
    ];

    cardNumbers = [
        '4242424242424242',
        '4000056655665556',
        '5555555555554444'
    ];

    randomValueFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    randomEmail() {
        return 'test' + new Date().getTime() + '@test.com';
    }

    randomCompanyUrl() {
        return 'test' + new Date().getTime() + '.test.com';
    }

    randomCompanyName() {
        return 'TestCo' + new Date().getTime();
    }

    getUserData() {
        return {
            firstName: 'TestName',
            lastName: 'TestSurname',
            email: this.randomEmail(),
            password: 'test1234',
            companyName: this.randomCompanyName(),
            companyUrl: this.randomCompanyUrl()
        }
    }

    getCardData() {
        return {
            nameOnCard: 'CARDHOLDER NAME',
            cardNumber: this.randomValueFromArray(this.cardNumbers),
            expDate: '10/22',
            cvc: '123',
            country: this.randomValueFromArray(this.countries),
            vat: '12345'
        }
    }
}
export default new TestDataGenerator();