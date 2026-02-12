import { Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    private readonly locators = {
        usernameInput: 'input[placeholder="Username"], input[name="username"]',
        passwordInput: 'input[placeholder="Password"], input[name="password"]',
        loginButton: 'button[type="submit"], button:has-text("Login")',
        dashboardUrl: /.*dashboard\/index|.*dashboard\/index\.php/,
        loginForm: 'form.oxd-form'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/', { waitUntil: 'domcontentloaded' });
        // Wait for the login form to be visible
        await this.page.waitForSelector(this.locators.loginForm, { timeout: 10000 });
    }

    async login(username: string = 'Admin', password: string = 'admin123') {
        // Wait for and fill username
        await this.page.locator(this.locators.usernameInput).first().fill(username, { timeout: 10000 });
        
        // Wait for and fill password
        await this.page.locator(this.locators.passwordInput).first().fill(password, { timeout: 10000 });
        
        // Click login button
        await this.page.locator(this.locators.loginButton).first().click({ timeout: 10000 });
        
        // Wait for navigation to dashboard with a reasonable timeout
        await expect(this.page).toHaveURL(this.locators.dashboardUrl, { timeout: 20000 });
        
        // Wait for page to be fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }
}
