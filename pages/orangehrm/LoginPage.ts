import { Page, expect } from '@playwright/test';
import { LoginPageLocators } from './Locators/LoginPageLocators';

export class LoginPage {
    readonly page: Page;
    private readonly locators: LoginPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new LoginPageLocators(page);
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });
        // Wait for the login form to be visible
        await this.locators.loginForm.waitFor({ state: 'visible', timeout: 15000 });
    }

    async login(username: string = 'Admin', password: string = 'admin123') {
        // Wait for and fill username
        await this.locators.usernameInput.first().fill(username, { timeout: 10000 });

        // Wait for and fill password
        await this.locators.passwordInput.first().fill(password, { timeout: 10000 });

        // Click login button
        await this.locators.loginButton.first().click({ timeout: 15000, force: true });

        // Wait for navigation to dashboard with a reasonable timeout
        try {
            await expect(this.page).toHaveURL(this.locators.dashboardUrl, { timeout: 15000 });
        } catch (error) {
            // If URL doesn't match, check if we're on dashboard by looking for dashboard header
            await expect(this.locators.dashboardHeader).toBeVisible({ timeout: 5000 });
        }

        // Wait for page to be fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }
}
