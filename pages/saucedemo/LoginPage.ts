import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    private readonly locators = {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]',
        inventoryUrl: /.*inventory.html/
    };

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.page.locator(this.locators.usernameInput).fill(username);
        await this.page.locator(this.locators.passwordInput).fill(password);
        await this.page.locator(this.locators.loginButton).click();
    }

    async getErrorMessage() {
        return this.page.locator(this.locators.errorMessage);
    }

    async verifyInventoryUrl() {
        await expect(this.page).toHaveURL(this.locators.inventoryUrl);
    }
}
