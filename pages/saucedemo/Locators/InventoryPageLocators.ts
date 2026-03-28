import { Page, Locator } from '@playwright/test';

export class InventoryPageLocators {
    readonly sortContainer: Locator;
    readonly itemPrice: Locator;
    readonly addToCartBackpack: Locator;
    readonly addToCartBikeLight: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.sortContainer = page.getByTestId('product-sort-container');
        this.itemPrice = page.locator('.inventory_item_price');
        this.addToCartBackpack = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.addToCartBikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }
}
