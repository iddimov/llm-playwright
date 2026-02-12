import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    private readonly locators = {
        sortContainer: '[data-test="product-sort-container"]',
        itemPrice: '.inventory_item_price',
        addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
        addToCartBikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        cartBadge: '.shopping_cart_badge',
        cartLink: '.shopping_cart_link'
    };

    constructor(page: Page) {
        this.page = page;
    }

    async sortProducts(option: string) {
        await this.page.locator(this.locators.sortContainer).selectOption(option);
    }

    async getItemPrices() {
        return await this.page.locator(this.locators.itemPrice).allInnerTexts();
    }

    async addItemToCart(item: 'backpack' | 'bike-light') {
        if (item === 'backpack') {
            await this.page.locator(this.locators.addToCartBackpack).click();
        } else if (item === 'bike-light') {
            await this.page.locator(this.locators.addToCartBikeLight).click();
        }
    }

    async getCartBadgeText() {
        return await this.page.locator(this.locators.cartBadge).innerText();
    }

    async goToCart() {
        await this.page.locator(this.locators.cartLink).click();
    }
}
