const { test, expect } = require('@playwright/test');

export class LoginPage{
    constructor(page){
        this.page = page;
        this.url = 'https://www.saucedemo.com/'
        this.loginInput = page.locator('[data-test="username"]')
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]')
    }


    async goto(){
        await this.page.goto(this.url)
    }

    async login(username, password){
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
