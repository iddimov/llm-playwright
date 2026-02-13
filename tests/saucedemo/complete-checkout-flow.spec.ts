// spec: specs/checkout_cases.md
// seed: tests/saucedemo/seed.spec.ts

import { test, expect } from '../../fixtures/auth/auth.fixtures';

test.describe('SauceDemo Checkout', () => {
  test('Complete Checkout Flow', async ({ inventoryPage, cartPage }) => {
    // Login handled by fixture

    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      await inventoryPage.addItemToCart('backpack');
    });

    await test.step('Click on the shopping cart badge', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Click "Checkout" button', async () => {
      await cartPage.checkout();
    });

    await test.step('Fill checkout details and continue', async () => {
      await cartPage.fillCheckoutDetails('Test', 'User', '12345');
    });

    await test.step('Click "Finish"', async () => {
      await cartPage.finishCheckout();
    });

    await test.step('Verify that the complete header says "Thank you for your order!"', async () => {
      const thankYouText = await cartPage.getCompleteHeaderText();
      expect(thankYouText).toBe('Thank you for your order!');
    });
  });
});