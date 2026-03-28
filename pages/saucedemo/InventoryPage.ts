import { Page, expect } from '@playwright/test';
import { InventoryPageLocators } from './Locators/InventoryPageLocators';

export class InventoryPage {
    readonly page: Page;
    private readonly locators: InventoryPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new InventoryPageLocators(page);
    }

    async sortProducts(option: string) {
        await this.locators.sortContainer.selectOption(option);
    }

    async getItemPrices() {
        return await this.locators.itemPrice.allInnerTexts();
    }

    async addItemToCart(item: 'backpack' | 'bike-light') {
        if (item === 'backpack') {
            await this.locators.addToCartBackpack.click();
        } else if (item === 'bike-light') {
            await this.locators.addToCartBikeLight.click();
        }
    }

    async getCartBadgeText() {
        return await this.locators.cartBadge.innerText();
    }

    async goToCart() {
        await this.locators.cartLink.click();
    }
}
