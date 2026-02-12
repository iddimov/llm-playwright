import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/LoginPage';

// Define the custom fixture type
type AuthFixtures = {
    authenticatedPage: import('@playwright/test').Page;
};

// Extend the base test
export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        // Get credentials from environment variables
        const username = process.env.TEST_USER;
        const password = process.env.TEST_PASSWORD;

        if (!username || !password) {
            throw new Error('TEST_USER and TEST_PASSWORD must be defined in .env');
        }

        // Perform login action
        await loginPage.navigate();
        await loginPage.login(username, password);

        // Verify login success before handing over control
        await loginPage.verifyInventoryUrl();

        // Use the authenticated page
        await use(page);
    },
});

export { expect } from '@playwright/test';

