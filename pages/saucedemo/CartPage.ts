import { Page, expect } from '@playwright/test';
import { CartPageLocators } from './Locators/CartPageLocators';

export class CartPage {
    readonly page: Page;
    private readonly locators: CartPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new CartPageLocators(page);
    }

    async verifyCartUrl() {
        await expect(this.page).toHaveURL(this.locators.cartUrl);
    }

    async checkout() {
        await this.locators.checkoutButton.click();
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.locators.firstNameInput.fill(firstName);
        await this.locators.lastNameInput.fill(lastName);
        await this.locators.postalCodeInput.fill(postalCode);
        await this.locators.continueButton.click();
    }

    async finishCheckout() {
        await this.locators.finishButton.click();
    }

    async getCompleteHeaderText() {
        return await this.locators.completeHeader.innerText();
    }
}
