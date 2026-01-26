const { test, expect } = require('@playwright/test');

export class CheckoutStepOnePage{
    constructor(page){
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
    }
async personalInfo(first_name, last_name, postal_code){
    await this.firstName.fill(first_name);
    await this.lastName.fill(last_name);
    await this.postalCode.fill(postal_code);
    await this.continueButton.click();
}
}