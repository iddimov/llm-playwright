// spec: specs/checkout_cases.md
// seed: tests/saucedemo/seed.spec.ts

import { test, expect } from '../../fixtures/pages/pages.fixtures';

test.describe('SauceDemo Checkout', () => {
  test('Complete Checkout Flow', async ({ inventoryPage, cartPage }) => {
    // Login is handled by seed/fixture
    
    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      await inventoryPage.addItemToCart('backpack');
    });

    await test.step('Click on the shopping cart badge', async () => {
      await inventoryPage.goToCart();
    });

    await test.step('Click "Checkout" button', async () => {
      await cartPage.clickCheckout();
    });

    await test.step('Fill "First Name" with "Test"', async () => {
      await cartPage.fillFirstName('Test');
    });

    await test.step('Fill "Last Name" with "User"', async () => {
      await cartPage.fillLastName('User');
    });

    await test.step('Fill "Zip/Postal Code" with "12345"', async () => {
      await cartPage.fillZipCode('12345');
    });

    await test.step('Click "Continue"', async () => {
      await cartPage.clickContinue();
    });

    await test.step('Click "Finish"', async () => {
      await cartPage.clickFinish();
    });

    await test.step('Verify that the complete header says "Thank you for your order!"', async () => {
      const completeHeader = await cartPage.getCompleteHeaderText();
      expect(completeHeader).toBe('Thank you for your order!');
    });
  });
});