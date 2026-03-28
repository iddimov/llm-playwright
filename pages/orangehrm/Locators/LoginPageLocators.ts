import { Page, Locator } from '@playwright/test';

export class LoginPageLocators {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly dashboardUrl: RegExp;
    readonly loginForm: Locator;
    readonly dashboardHeader: Locator;

    constructor(page: Page) {
        this.usernameInput = page.getByPlaceholder('Username').or(page.locator('input[name="username"]'));
        this.passwordInput = page.getByPlaceholder('Password').or(page.locator('input[name="password"]'));
        this.loginButton = page.getByRole('button', { name: 'Login' }).or(page.locator('button[type="submit"]'));
        this.dashboardUrl = /.*dashboard\/index|.*dashboard\/index\.php|.*dashboard$|.*dashboard\/$/;
        this.loginForm = page.locator('form.oxd-form');
        this.dashboardHeader = page.getByRole('heading', { level: 6, name: 'Dashboard' });
    }
}
