const { test, expect } = require('@playwright/test');

export class CartPage{
    constructor(page){
        this.page = page;
        this.fleeceJacket = page.getByText('$49.99')
        this.checkoutButton = page.locator('[data-test="checkout"]')
    }


    async cart(){
        await this.fleeceJacket.textContent();
        await this.checkoutButton.click();
    }
}

