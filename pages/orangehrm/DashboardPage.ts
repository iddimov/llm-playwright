import { Page, expect } from '@playwright/test';
import { DashboardPageLocators } from './Locators/DashboardPageLocators';

export class DashboardPage {
    readonly page: Page;
    private readonly locators: DashboardPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new DashboardPageLocators(page);
    }

    async navigateToPIM() {
        // Wait for the PIM link to be visible and click it
        await this.locators.pimLink.first().click({ timeout: 10000 });
        
        // Wait for navigation to PIM page with a longer timeout
        // Also check for common PIM page elements as fallback
        try {
            await expect(this.page).toHaveURL(this.locators.pimUrl, { timeout: 15000 });
        } catch (error) {
            // If URL doesn't match, wait for PIM page to load by checking for common elements
            await this.page.waitForLoadState('domcontentloaded');
            // Check for PIM header or add button as confirmation
            await expect(this.page.getByRole('button', { name: 'Add' }).or(this.page.getByRole('heading', { name: 'PIM', level: 6 }))).toBeVisible({ timeout: 5000 });
        }
        
        // Wait for the page to be fully loaded
        await this.page.waitForLoadState('domcontentloaded');
    }
}
