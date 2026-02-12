import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    private readonly locators = {
        cartUrl: /.*cart.html/,
        checkoutButton: '[data-test="checkout"]',
        firstNameInput: '[data-test="firstName"]',
        lastNameInput: '[data-test="lastName"]',
        postalCodeInput: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        finishButton: '[data-test="finish"]',
        completeHeader: '.complete-header'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async verifyCartUrl() {
        await expect(this.page).toHaveURL(this.locators.cartUrl);
    }

    async checkout() {
        await this.page.locator(this.locators.checkoutButton).click();
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(this.locators.firstNameInput).fill(firstName);
        await this.page.locator(this.locators.lastNameInput).fill(lastName);
        await this.page.locator(this.locators.postalCodeInput).fill(postalCode);
        await this.page.locator(this.locators.continueButton).click();
    }

    async finishCheckout() {
        await this.page.locator(this.locators.finishButton).click();
    }

    async getCompleteHeaderText() {
        return await this.page.locator(this.locators.completeHeader).innerText();
    }
}
