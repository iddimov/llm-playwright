import { Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    private readonly locators = {
        pimLink: 'a:has-text("PIM"), span:has-text("PIM")',
        pimUrl: /.*viewPimModule|.*viewEmployeeList|.*pim\/viewEmployeeList/
    };

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPIM() {
        // Wait for the PIM link to be visible and click it
        await this.page.locator(this.locators.pimLink).first().click({ timeout: 10000 });
        
        // Wait for navigation to PIM page with a longer timeout
        await expect(this.page).toHaveURL(this.locators.pimUrl, { timeout: 15000 });
        
        // Wait for the page to be fully loaded by checking for common PIM page elements
        await this.page.waitForLoadState('domcontentloaded');
    }
}
