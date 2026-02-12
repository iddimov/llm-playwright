import { test, expect } from '../../fixtures/auth/auth.fixtures';

test('seed', async ({ authenticatedPage }) => {
    // This seed test navigates to the inventory.
    // Agents will use this context to understand that 'authenticatedPage' 
    // is available and handles the login sequence automatically.
    await expect(authenticatedPage).toHaveURL(/.*inventory.html/);
});
