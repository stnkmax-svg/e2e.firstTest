const { test, expect } = require('@playwright/test');

export class CheckoutStepTwoPage{
    constructor(page){
        this.page = page;
        this.finishButton = page.locator('[data-test="finish"]')
    }
async lastStep(){
    await this.finishButton.click();
}

}