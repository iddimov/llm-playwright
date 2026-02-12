import { test as base } from '@playwright/test';
import { LoginPage as SauceLoginPage } from '../../pages/saucedemo/LoginPage';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { CartPage } from '../../pages/saucedemo/CartPage';
import { LoginPage as OrangeLoginPage } from '../../pages/orangehrm/LoginPage';
import { DashboardPage } from '../../pages/orangehrm/DashboardPage';
import { EmployeePage } from '../../pages/orangehrm/EmployeePage';

// Declare the types of your fixtures.
type PageFixtures = {
    sauceLoginPage: SauceLoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    orangeLoginPage: OrangeLoginPage;
    dashboardPage: DashboardPage;
    employeePage: EmployeePage;
};

// Extend base test to include page objects
export const test = base.extend<PageFixtures>({
    sauceLoginPage: async ({ page }, use) => {
        await use(new SauceLoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    orangeLoginPage: async ({ page }, use) => {
        await use(new OrangeLoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    employeePage: async ({ page }, use) => {
        await use(new EmployeePage(page));
    },
});

export { expect } from '@playwright/test';
