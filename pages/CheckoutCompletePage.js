const { test, expect } = require('@playwright/test');

export class CheckoutCompletePage{
    constructor(page){
        this.page = page;
        this.finalTitle = page.locator('[data-test="complete-header"]')
    }
async thankYouTitle(){
    await this.finalTitle.textContent();
}
}