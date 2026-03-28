import { Page, expect } from '@playwright/test';
import { LoginPageLocators } from './Locators/LoginPageLocators';

export class LoginPage {
    readonly page: Page;
    private readonly locators: LoginPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new LoginPageLocators(page);
    }

    async navigate() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.locators.usernameInput.fill(username);
        await this.locators.passwordInput.fill(password);
        await this.locators.loginButton.click();
    }

    async getErrorMessage() {
        return this.locators.errorMessage;
    }

    async verifyInventoryUrl() {
        await expect(this.page).toHaveURL(this.locators.inventoryUrl);
    }
}
