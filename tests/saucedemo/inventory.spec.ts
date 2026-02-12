import { test, expect } from '../../fixtures/auth/auth.fixtures';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';

test('should sort products by price (low to high)', async ({ authenticatedPage }) => {
    const inventoryPage = new InventoryPage(authenticatedPage);

    // Select the sort option
    await inventoryPage.sortProducts('lohi');

    // Get all item prices
    const prices = await inventoryPage.getItemPrices();

    // Convert strings "$29.99" to numbers 29.99
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // Verify the array is sorted
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
});
