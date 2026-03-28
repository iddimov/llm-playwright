import { Page, Locator } from '@playwright/test';

export class LoginPageLocators {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly inventoryUrl: RegExp;

    constructor(page: Page) {
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
        this.inventoryUrl = /.*inventory.html/;
    }
}
