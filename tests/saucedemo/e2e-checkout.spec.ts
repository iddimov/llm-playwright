import { test, expect } from '../../fixtures/auth/auth.fixtures';

test('E2E Checkout Flow', async ({ inventoryPage, cartPage }) => {

    // 1. Add items
    await inventoryPage.addItemToCart('backpack');
    await inventoryPage.addItemToCart('bike-light');

    // 2. Verify Badge
    const badgeText = await inventoryPage.getCartBadgeText();
    expect(badgeText).toBe('2');

    // 3. Go to Cart
    await inventoryPage.goToCart();
    await cartPage.verifyCartUrl();

    // 4. Checkout
    await cartPage.checkout();

    // 5. Fill Details
    await cartPage.fillCheckoutDetails('John', 'Doe', '12345');

    // 6. Finish
    await cartPage.finishCheckout();

    // 7. Verify Success
    const completeText = await cartPage.getCompleteHeaderText();
    expect(completeText).toBe('Thank you for your order!');
});
