const { test, expect } = require('@playwright/test');

export class InventoryPage{
    constructor(page){
        this.page = page;
        this.productsTitle = page.locator('[data-test="title"]');
        this.sortButton = page.locator('[data-test="product-sort-container"]');
        this.mostExpensiveItem = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
        this.cartButton = page.locator('[data-test="shopping-cart-link"]')
    }



    async inventory(){
        await this.productsTitle.textContent();
        await this.sortButton.click();
        await this.sortButton.selectOption('hilo');
        await this.page.waitForTimeout(1000)
        await this.mostExpensiveItem.click();
        await this.cartButton.click();
    }
}