import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    private readonly locators = {
        usernameInput: 'input[placeholder="Username"], input[name="username"]',
        passwordInput: 'input[placeholder="Password"], input[name="password"]',
        loginButton: 'button[type="submit"], button:has-text("Login")',
        dashboardUrl: /.*dashboard\/index|.*dashboard\/index\.php|.*dashboard$|.*dashboard\/$/,
        loginForm: 'form.oxd-form',
        dashboardHeader: 'h6:has-text("Dashboard")'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });
        // Wait for the login form to be visible
        await this.page.waitForSelector(this.locators.loginForm, { timeout: 15000 });
    }

    async login(username: string = 'Admin', password: string = 'admin123') {
        // Wait for and fill username
        await this.page.locator(this.locators.usernameInput).first().fill(username, { timeout: 10000 });

        // Wait for and fill password
        await this.page.locator(this.locators.passwordInput).first().fill(password, { timeout: 10000 });

        // Click login button
        await this.page.locator(this.locators.loginButton).first().click({ timeout: 15000, force: true });

        // Wait for navigation to dashboard with a reasonable timeout
        // Try multiple URL patterns and also check for dashboard header
        try {
            await expect(this.page).toHaveURL(this.locators.dashboardUrl, { timeout: 15000 });
        } catch (error) {
            // If URL doesn't match, check if we're on dashboard by looking for dashboard header
            await expect(this.page.locator(this.locators.dashboardHeader)).toBeVisible({ timeout: 5000 });
        }

        // Wait for page to be fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }
}
