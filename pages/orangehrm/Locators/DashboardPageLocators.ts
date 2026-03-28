import { Page, Locator } from '@playwright/test';

export class DashboardPageLocators {
    readonly pimLink: Locator;
    readonly pimUrl: RegExp;

    constructor(page: Page) {
        this.pimLink = page.getByRole('link', { name: 'PIM' }).or(page.locator('a:has-text("PIM")')).or(page.locator('span:has-text("PIM")'));
        this.pimUrl = /.*viewPimModule|.*viewEmployeeList|.*pim\/viewEmployeeList/;
    }
}
