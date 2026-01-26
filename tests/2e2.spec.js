const { test, expect } = require('@playwright/test');
import { LoginPage } from '../pages/loginpage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('full test', async({page})=>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.goto()
    await loginPage.login('standard_user',"secret_sauce")
    await inventoryPage.inventory()
    await cartPage.cart()
    await checkoutStepOnePage.personalInfo('user', 'test', '12345');
    await checkoutStepTwoPage.lastStep();
    await checkoutCompletePage.thankYouTitle();
})
