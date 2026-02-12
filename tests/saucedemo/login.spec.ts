import { test, expect } from '../../fixtures/pages/pages.fixtures';

test.describe('Authentication', () => {

    test('should login successfully with valid credentials', async ({ sauceLoginPage }) => {
        await test.step('Navigate to login page', async () => {
            await sauceLoginPage.navigate();
        });

        await test.step('Login with valid credentials', async () => {
            const username = process.env.TEST_USER;
            const password = process.env.TEST_PASSWORD;
            if (!username || !password) throw new Error('Credentials not found in .env');

            await sauceLoginPage.login(username, password);
        });

        await test.step('Verify redirection to inventory', async () => {
            await sauceLoginPage.verifyInventoryUrl();
        });
    });

    test('should show error for locked out user', async ({ sauceLoginPage }) => {
        await test.step('Navigate to login page', async () => {
            await sauceLoginPage.navigate();
        });

        await test.step('Login with locked out user', async () => {
            const lockedUser = process.env.LOCKED_USER || 'locked_out_user';
            const password = process.env.TEST_PASSWORD || 'secret_sauce';
            await sauceLoginPage.login(lockedUser, password);
        });

        await test.step('Verify error message', async () => {
            const errorMessage = await sauceLoginPage.getErrorMessage();
            await expect(errorMessage).toContainText('Sorry, this user has been locked out');
        });
    });

    test('should show error for invalid credentials', async ({ sauceLoginPage }) => {
        await test.step('Navigate to login page', async () => {
            await sauceLoginPage.navigate();
        });

        await test.step('Login with invalid credentials', async () => {
            await sauceLoginPage.login('wrong_user', 'secret_sauce');
        });

        await test.step('Verify error message', async () => {
            const errorMessage = await sauceLoginPage.getErrorMessage();
            await expect(errorMessage).toContainText('Username and password do not match any user in this service');
        });
    });
});

