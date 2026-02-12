### 1. SauceDemo Checkout
**Seed:** `tests/saucedemo/seed.spec.ts`

#### 1.1 Complete Checkout Flow
**Steps:**
1. Login is handled by seed/fixture.
2. Add "Sauce Labs Backpack" to cart.
3. Click on the shopping cart badge.
4. Click "Checkout" button.
5. Fill "First Name" with "Test".
6. Fill "Last Name" with "User".
7. Fill "Zip/Postal Code" with "12345".
8. Click "Continue".
9. Click "Finish".
10. Verify that the complete header says "Thank you for your order!".
